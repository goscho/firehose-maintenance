# Data migration from MS Access to Firehose app database

This guide shows how to restore the MS Access-exported dump into the same database as the Firehose app and then run the
migration script to populate the Firehose tables.

0) Use https://www.bullzip.com/products/a2p/info.php to move MS Access data to an Postgres DB using default config. When
   data is in DB use pg_dump to dump it into a file.

1) Restore the MS Access dump into schema `firehose` of your target database (example container and paths below).
   Adjust container name, user, DB name, and file path as needed.

```bash
# Restore into the access schema of the firehose database
# (Assumes the dump was created with pg_dump/pg_restore compatible format)
docker exec -i firehose-maintenance-db-1 pg_restore \
  -U postgres \
  -d firehose \
  -v < ~/code/firehose-maintenance/data-migration/access_imported.sql
```

2) Run the migration script to transform and load data into Firehose tables:

```bash
docker exec -i firehose-maintenance-db-1 psql -U postgres -d firehose \
  < ~/code/firehose-maintenance/data-migration/migrate_access_to_firehose.sql
```

Notes:

- The script is idempotent and can be re-run; it uses deterministic IDs and ON CONFLICT safeguards.
- By default, all hoses are assigned to owner marker BK-31 (name "Feuerwehr BK-31"). Edit the top of the SQL file to
  change the owner marker/name.
- If your legacy tables ended up in the public schema instead of `access`, replace occurrences of access."TBL_…" in the
  SQL file with public."TBL_…" before running.