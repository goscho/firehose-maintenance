-- all hoseNumbers that are in use including 0 to be able to find 1 as min
WITH usedFirehoseNumbers AS (SELECT 0 AS number
                             UNION ALL
                             SELECT number
                             FROM "FireHose"
                             WHERE "decommissionedAt" is null
                               AND "ownerId" = $1)
SELECT t1.number + 1 AS min_free_number
FROM usedFirehoseNumbers t1
         LEFT JOIN "FireHose" t2
                   ON t1.number + 1 = t2.number
                       AND t2."decommissionedAt" is null
                       AND t2."ownerId" = $1
WHERE t2.number IS NULL
ORDER BY t1.number
LIMIT 1;