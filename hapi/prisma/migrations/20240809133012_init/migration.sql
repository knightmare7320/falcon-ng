-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "L4Market" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "L4Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "L5Market" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "l4MarketId" INTEGER NOT NULL,

    CONSTRAINT "L5Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgCluster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "l5MarketId" INTEGER NOT NULL,

    CONSTRAINT "OrgCluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortKey" INTEGER,

    CONSTRAINT "SiteType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepairPriority" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortKey" INTEGER,

    CONSTRAINT "RepairPriority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructureType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortKey" INTEGER,

    CONSTRAINT "StructureType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeZone" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortKey" INTEGER,

    CONSTRAINT "TimeZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "cascadeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siteTypeId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "elevation" DOUBLE PRECISION NOT NULL,
    "structureTypeId" INTEGER NOT NULL,
    "repairPriorityId" INTEGER NOT NULL,
    "timezoneId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "l4MarketId" INTEGER NOT NULL,
    "l5MarketId" INTEGER NOT NULL,
    "orgClusterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" INTEGER,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "L4Market_regionId_name_key" ON "L4Market"("regionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "L5Market_l4MarketId_name_key" ON "L5Market"("l4MarketId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OrgCluster_l5MarketId_name_key" ON "OrgCluster"("l5MarketId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Site_cascadeCode_key" ON "Site"("cascadeCode");

-- AddForeignKey
ALTER TABLE "L4Market" ADD CONSTRAINT "L4Market_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "L5Market" ADD CONSTRAINT "L5Market_l4MarketId_fkey" FOREIGN KEY ("l4MarketId") REFERENCES "L4Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgCluster" ADD CONSTRAINT "OrgCluster_l5MarketId_fkey" FOREIGN KEY ("l5MarketId") REFERENCES "L5Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_siteTypeId_fkey" FOREIGN KEY ("siteTypeId") REFERENCES "SiteType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_structureTypeId_fkey" FOREIGN KEY ("structureTypeId") REFERENCES "StructureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_repairPriorityId_fkey" FOREIGN KEY ("repairPriorityId") REFERENCES "RepairPriority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "TimeZone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_l4MarketId_fkey" FOREIGN KEY ("l4MarketId") REFERENCES "L4Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_l5MarketId_fkey" FOREIGN KEY ("l5MarketId") REFERENCES "L5Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_orgClusterId_fkey" FOREIGN KEY ("orgClusterId") REFERENCES "OrgCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
