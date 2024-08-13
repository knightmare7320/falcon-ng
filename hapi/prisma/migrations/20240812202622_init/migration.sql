-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedById` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLogin` (
    `userId` INTEGER NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `lastLoginSuccess` DATETIME(3) NULL,
    `lastLoginAttempt` DATETIME(3) NULL,
    `lastPasswordChange` DATETIME(3) NULL,
    `failedLoginCount` INTEGER NOT NULL DEFAULT 0,
    `requirePasswordChange` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `L4Market` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `regionId` INTEGER NOT NULL,

    UNIQUE INDEX `L4Market_regionId_name_key`(`regionId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `L5Market` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `l4MarketId` INTEGER NOT NULL,

    UNIQUE INDEX `L5Market_l4MarketId_name_key`(`l4MarketId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrgCluster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `l5MarketId` INTEGER NOT NULL,

    UNIQUE INDEX `OrgCluster_l5MarketId_name_key`(`l5MarketId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteType` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `SiteType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepairPriority` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `RepairPriority_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StructureType` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `StructureType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeZone` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `TimeZone_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cascadeCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `siteTypeId` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `elevation` DOUBLE NOT NULL,
    `structureTypeId` INTEGER NOT NULL,
    `repairPriorityId` INTEGER NOT NULL,
    `timezoneId` INTEGER NOT NULL,
    `orgClusterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `updatedById` INTEGER NULL,

    UNIQUE INDEX `Site_cascadeCode_key`(`cascadeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `Technology_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentVendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EquipmentVendor_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `equipmentVendorId` INTEGER NOT NULL,

    UNIQUE INDEX `EquipmentModel_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Msc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `clliCode` VARCHAR(191) NOT NULL,
    `equipmentVendorId` INTEGER NOT NULL,

    UNIQUE INDEX `Msc_name_key`(`name`),
    UNIQUE INDEX `Msc_clliCode_key`(`clliCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bsc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mscId` INTEGER NOT NULL,
    `equipmentVendorId` INTEGER NOT NULL,

    UNIQUE INDEX `Bsc_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteId` INTEGER NOT NULL,
    `bscId` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `equipmentVendorId` INTEGER NOT NULL,
    `equipmentModelId` INTEGER NOT NULL,
    `onAirDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `updatedById` INTEGER NULL,

    UNIQUE INDEX `Bts_bscId_number_key`(`bscId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AntennaModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `equipmentVendorId` INTEGER NOT NULL,
    `horizontalBw` DOUBLE NOT NULL,
    `verticalBw` DOUBLE NOT NULL,
    `gainDbi` DOUBLE NOT NULL,
    `frontToBackRatio` DOUBLE NOT NULL,
    `electricalTilt` DOUBLE NOT NULL,

    UNIQUE INDEX `AntennaModel_equipmentVendorId_name_key`(`equipmentVendorId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteId` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `azimuth` DOUBLE NOT NULL,
    `heightAgl` DOUBLE NOT NULL,
    `mechanicalTilt` DOUBLE NOT NULL,
    `antennaModelId` INTEGER NOT NULL,
    `sectorCoverageTypeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `updatedById` INTEGER NULL,

    UNIQUE INDEX `Sector_siteId_number_key`(`siteId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SectorCoverageType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `SectorCoverageType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarrierType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `CarrierType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarrierDesignation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sortKey` INTEGER NULL,

    UNIQUE INDEX `CarrierDesignation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,

    UNIQUE INDEX `Channel_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `btsId` INTEGER NOT NULL,
    `channelId` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `carrierDesignationId` INTEGER NOT NULL,
    `carrierTypeId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `onAirDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `updatedById` INTEGER NULL,

    UNIQUE INDEX `Carrier_btsId_number_key`(`btsId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLogin` ADD CONSTRAINT `UserLogin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `L4Market` ADD CONSTRAINT `L4Market_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `L5Market` ADD CONSTRAINT `L5Market_l4MarketId_fkey` FOREIGN KEY (`l4MarketId`) REFERENCES `L4Market`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrgCluster` ADD CONSTRAINT `OrgCluster_l5MarketId_fkey` FOREIGN KEY (`l5MarketId`) REFERENCES `L5Market`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_siteTypeId_fkey` FOREIGN KEY (`siteTypeId`) REFERENCES `SiteType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_structureTypeId_fkey` FOREIGN KEY (`structureTypeId`) REFERENCES `StructureType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_repairPriorityId_fkey` FOREIGN KEY (`repairPriorityId`) REFERENCES `RepairPriority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_timezoneId_fkey` FOREIGN KEY (`timezoneId`) REFERENCES `TimeZone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_orgClusterId_fkey` FOREIGN KEY (`orgClusterId`) REFERENCES `OrgCluster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentModel` ADD CONSTRAINT `EquipmentModel_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Msc` ADD CONSTRAINT `Msc_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bsc` ADD CONSTRAINT `Bsc_mscId_fkey` FOREIGN KEY (`mscId`) REFERENCES `Msc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bsc` ADD CONSTRAINT `Bsc_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_bscId_fkey` FOREIGN KEY (`bscId`) REFERENCES `Bsc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_equipmentModelId_fkey` FOREIGN KEY (`equipmentModelId`) REFERENCES `EquipmentModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bts` ADD CONSTRAINT `Bts_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AntennaModel` ADD CONSTRAINT `AntennaModel_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_antennaModelId_fkey` FOREIGN KEY (`antennaModelId`) REFERENCES `AntennaModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_sectorCoverageTypeId_fkey` FOREIGN KEY (`sectorCoverageTypeId`) REFERENCES `SectorCoverageType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrier` ADD CONSTRAINT `Carrier_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrier` ADD CONSTRAINT `Carrier_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
