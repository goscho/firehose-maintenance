-- Migrate legacy Access data (access schema) into Firehose app schema (public)
-- Requirements/assumptions:
-- - The legacy tables TBL_SCHLAUCH, TBL_PRUEFUNG, TBL_REINIGUNG, TBL_PRUEFER exist in schema "firehose" of the SAME database.
-- - Destination tables are Prisma-managed and live in schema public with exact names: "Owner", "FireHose", "Maintenance".
-- - Script is idempotent: can be re-run safely. IDs are derived deterministically from source records; ON CONFLICT DO NOTHING used where applicable.

BEGIN;

-- Prefer legacy tables from access schema, but fall back to public if needed
SET LOCAL search_path = public, pg_catalog;

-- Needed for digest()/gen_random_bytes()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Parameters: change these if needed
-- Default owner marker and name for all imported hoses
WITH params AS (SELECT 'BK-31'::text  AS owner_marker,
                       'FF Murrhardt' AS owner_name)
-- Upsert owner and get id
   , upsert_owner AS (
    INSERT INTO public."Owner" (id, marker, name)
        SELECT
            -- deterministic 12-char id from marker
            SUBSTRING(ENCODE(DIGEST('owner:' || p.owner_marker, 'sha256'), 'base64') FROM 1 FOR 12) AS id,
            p.owner_marker,
            p.owner_name
        FROM params p
        ON CONFLICT (marker) DO UPDATE SET name = EXCLUDED.name
        RETURNING id)
-- Prepare source hoses
   , src_hoses AS (SELECT s."ID"                              AS src_id,
                          s."NUMMER"                          AS number,
                          COALESCE(s."LAENGE", 0)             AS length,
                          COALESCE(s."GROESSE", 'A')          AS diameter,
                          COALESCE(s."IM_DIENST_SEIT", NOW()) AS commissioned_at
                   FROM "TBL_SCHLAUCH" s)
-- Insert FireHose rows
   , insert_hoses AS (
    INSERT INTO public."FireHose" (id, number, "ownerId", length, diameter, "commissionedAt", "decommissionedAt")
        SELECT
            -- Deterministic ID from owner + number to allow safe re-runs
            SUBSTRING(
                    ENCODE(DIGEST('fh:' || (SELECT id FROM upsert_owner) || ':' || h.number::text, 'sha256'), 'base64')
                    FROM 1 FOR 12)        AS id,
            h.number,
            (SELECT id FROM upsert_owner) AS ownerId,
            h.length,
            h.diameter,
            h.commissioned_at,
            NULL::timestamp
        FROM src_hoses h
        ON CONFLICT (id) DO NOTHING
        RETURNING id, number)
-- Map numbers to FireHose ids (covers both freshly inserted and pre-existing rows)
   , hose_map AS (SELECT f."id", f."number"
                  FROM public."FireHose" f
                  WHERE f."ownerId" = (SELECT id FROM upsert_owner))
-- Prepare testers for names
   , testers AS (SELECT p."ID"                                                                        AS id,
                        TRIM(BOTH FROM CONCAT_WS(' ', NULLIF(p."VORNAME", ''), NULLIF(p."NAME", ''))) AS full_name
                 FROM "TBL_PRUEFER" p)
-- Insert Maintenance entries from PRUEFUNG (tests)

-- Execute tests import
INSERT
INTO public."Maintenance" (id, "timestamp", "testPassed", "failureDescription", "fireHoseId")
SELECT
    -- Deterministic ID based on source test id
    SUBSTRING(ENCODE(DIGEST('mnt:pruefung:' || t."ID"::text, 'sha256'), 'base64') FROM 1 FOR 12) AS id,
    t."DATUM"::timestamp                                                                         AS "timestamp",
    COALESCE(t."BESTANDEN", false)                                                               AS "testPassed",
    NULLIF(t."DEFEKT_BESCHREIBUNG", '')                                                          AS "failureDescription",
    hm."id"                                                                                      AS "fireHoseId"
FROM "TBL_PRUEFUNG" t
         JOIN "TBL_SCHLAUCH" s ON s."ID" = t."SCHLAUCH_ID"
         JOIN hose_map hm ON hm."number" = s."NUMMER"
ON CONFLICT (id) DO NOTHING;
-- -- Insert Maintenance entries from REINIGUNG (cleaning) as passed checks with a note
-- WITH hose_map AS (
--   SELECT f."id", f."number"
--   FROM public."FireHose" f
--   JOIN public."Owner" o ON o."id" = f."ownerId"
--   WHERE o."marker" = 'BK-31'
-- )
-- INSERT INTO public."Maintenance" (id, username, "timestamp", "testPassed", "failureDescription", "fireHoseId")
-- SELECT
--   SUBSTRING(ENCODE(DIGEST('mnt:reinigung:' || r."ID"::text, 'sha256'), 'base64') FROM 1 FOR 12) AS id,
--   'import:reinigung' AS username,
--   r."DATUM"::timestamp AS "timestamp",
--   true AS "testPassed",
--   'Reinigung durchgeführt' AS "failureDescription",
--   hm."id" AS "fireHoseId"
-- FROM "TBL_REINIGUNG" r
-- JOIN "TBL_SCHLAUCH" s ON s."ID" = r."SCHLAUCH_ID"
-- JOIN hose_map hm ON hm."number" = s."NUMMER"
-- ON CONFLICT (id) DO NOTHING;

-- Insert Maintenance entries from PRUEFUNG (tests) - self-contained (ensures execution)
WITH hose_map AS (SELECT f."id", f."number"
                  FROM public."FireHose" f
                           JOIN public."Owner" o ON o."id" = f."ownerId"
                  WHERE o."marker" = 'BK-31')
INSERT
INTO public."Maintenance" (id, "timestamp", "testPassed", "failureDescription", "fireHoseId")
SELECT SUBSTRING(ENCODE(DIGEST('mnt:pruefung:' || t."ID"::text, 'sha256'), 'base64') FROM 1 FOR 12) AS id,
       t."DATUM"::timestamp                                                                         AS "timestamp",
       COALESCE(t."BESTANDEN", false)                                                               AS "testPassed",
       NULLIF(t."DEFEKT_BESCHREIBUNG", '')                                                          AS "failureDescription",
       hm."id"                                                                                      AS "fireHoseId"
FROM "TBL_PRUEFUNG" t
         JOIN "TBL_SCHLAUCH" s ON s."ID" = t."SCHLAUCH_ID"
         JOIN hose_map hm ON hm."number" = s."NUMMER"
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- How to adapt if your legacy tables were restored into public schema (not access):
--   Replace public."TBL_…" with public."TBL_…" occurrences above.
