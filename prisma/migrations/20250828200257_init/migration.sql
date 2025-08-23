-- CreateTable
CREATE TABLE "public"."FailureDescription" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "FailureDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Maintenance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "testPassed" BOOLEAN NOT NULL,
    "failureDescription" TEXT,
    "fireHoseId" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FireHose" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "diameter" TEXT NOT NULL,
    "commissionedAt" TIMESTAMP(3) NOT NULL,
    "decommissionedAt" TIMESTAMP(3),

    CONSTRAINT "FireHose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "marker" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_owner_number_decommissioned" ON "public"."FireHose"("ownerId", "number", "decommissionedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_name_key" ON "public"."Owner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_marker_key" ON "public"."Owner"("marker");

-- AddForeignKey
ALTER TABLE "public"."Maintenance" ADD CONSTRAINT "Maintenance_fireHoseId_fkey" FOREIGN KEY ("fireHoseId") REFERENCES "public"."FireHose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FireHose" ADD CONSTRAINT "FireHose_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
