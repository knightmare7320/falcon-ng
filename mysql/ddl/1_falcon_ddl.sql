CREATE DATABASE falcon;
USE falcon;

CREATE TABLE `Timezone` (
  `id`      int          NOT NULL,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Timezone_name_key` (`name`)
);

CREATE TABLE `Technology` (
  `id`      int          NOT NULL AUTO_INCREMENT,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Technology_name_key` (`name`)
);

CREATE TABLE `CarrierDesignation` (
  `id`      int          NOT NULL AUTO_INCREMENT,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CarrierDesignation_name_key` (`name`)
);

CREATE TABLE `CarrierType` (
  `id`      int          NOT NULL AUTO_INCREMENT,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CarrierType_name_key` (`name`)
);

CREATE TABLE `Channel` (
  `id`     int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Channel_number_key` (`number`)
);

CREATE TABLE `RepairPriority` (
  `id`      int          NOT NULL,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `RepairPriority_name_key` (`name`)
);

CREATE TABLE `SectorCoverageType` (
  `id`      int          NOT NULL AUTO_INCREMENT,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SectorCoverageType_name_key` (`name`)
);

CREATE TABLE `SiteType` (
  `id`      int          NOT NULL,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SiteType_name_key` (`name`)
);

CREATE TABLE `StructureType` (
  `id`      int          NOT NULL,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StructureType_name_key` (`name`)
);

CREATE TABLE `User` (
  `id`          int          NOT NULL AUTO_INCREMENT,
  `firstName`   varchar(191) DEFAULT NULL,
  `lastName`    varchar(191) NOT NULL,
  `createdAt`   datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedById` int          DEFAULT NULL,
  `updatedAt`   datetime(3)  DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_firstName_lastName_key` (`firstName`,`lastName`),
  KEY `User_updatedById_fkey` (`updatedById`),
  CONSTRAINT `User_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `UserLogin` (
  `userId`                int          NOT NULL,
  `userName`              varchar(191) NOT NULL,
  `password`              varchar(191) NOT NULL,
  `lastLoginSuccess`      datetime(3)  DEFAULT NULL,
  `lastLoginAttempt`      datetime(3)  DEFAULT NULL,
  `lastPasswordChange`    datetime(3)  DEFAULT NULL,
  `failedLoginCount`      int          NOT NULL DEFAULT 0,
  `requirePasswordChange` tinyint(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`),
  CONSTRAINT `UserLogin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Region` (
  `id`   int          NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Region_name_key` (`name`)
);

CREATE TABLE `L4Market` (
  `id`       int          NOT NULL AUTO_INCREMENT,
  `name`     varchar(191) NOT NULL,
  `regionId` int          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `L4Market_regionId_name_key` (`regionId`,`name`),
  CONSTRAINT `L4Market_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `L5Market` (
  `id`         int          NOT NULL AUTO_INCREMENT,
  `name`       varchar(191) NOT NULL,
  `l4MarketId` int          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `L5Market_l4MarketId_name_key` (`l4MarketId`,`name`),
  CONSTRAINT `L5Market_l4MarketId_fkey` FOREIGN KEY (`l4MarketId`) REFERENCES `L4Market` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `OrgCluster` (
  `id`         int          NOT NULL AUTO_INCREMENT,
  `name`       varchar(191) NOT NULL,
  `l5MarketId` int          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrgCluster_l5MarketId_name_key` (`l5MarketId`,`name`),
  CONSTRAINT `OrgCluster_l5MarketId_fkey` FOREIGN KEY (`l5MarketId`) REFERENCES `L5Market` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Site` (
  `id`               int          NOT NULL AUTO_INCREMENT,
  `cascadeCode`      varchar(191) NOT NULL,
  `name`             varchar(191) NOT NULL,
  `siteTypeId`       int          NOT NULL,
  `address`          varchar(191) NOT NULL,
  `city`             varchar(191) NOT NULL,
  `state`            varchar(191) NOT NULL,
  `zipCode`          varchar(191) NOT NULL,
  `county`           varchar(191) NOT NULL,
  `latitude`         double       NOT NULL,
  `longitude`        double       NOT NULL,
  `elevation`        double       DEFAULT NULL,
  `structureTypeId`  int          NOT NULL,
  `repairPriorityId` int          NOT NULL,
  `timezoneId`       int          DEFAULT NULL,
  `orgClusterId`     int          NOT NULL,
  `createdAt`        datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById`      int          NOT NULL,
  `updatedAt`        datetime(3)  DEFAULT NULL,
  `updatedById`      int          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Site_cascadeCode_key` (`cascadeCode`),
  KEY `Site_siteTypeId_fkey` (`siteTypeId`),
  KEY `Site_structureTypeId_fkey` (`structureTypeId`),
  KEY `Site_repairPriorityId_fkey` (`repairPriorityId`),
  KEY `Site_timezoneId_fkey` (`timezoneId`),
  KEY `Site_orgClusterId_fkey` (`orgClusterId`),
  KEY `Site_createdById_fkey` (`createdById`),
  KEY `Site_updatedById_fkey` (`updatedById`),
  CONSTRAINT `Site_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_orgClusterId_fkey` FOREIGN KEY (`orgClusterId`) REFERENCES `OrgCluster` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_repairPriorityId_fkey` FOREIGN KEY (`repairPriorityId`) REFERENCES `RepairPriority` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_siteTypeId_fkey` FOREIGN KEY (`siteTypeId`) REFERENCES `SiteType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_structureTypeId_fkey` FOREIGN KEY (`structureTypeId`) REFERENCES `StructureType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_timezoneId_fkey` FOREIGN KEY (`timezoneId`) REFERENCES `Timezone` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Site_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `EquipmentVendor` (
  `id`                   int          NOT NULL AUTO_INCREMENT,
  `name`                 varchar(191) NOT NULL,
  `antennaVendor`        tinyint(1)   NOT NULL DEFAULT 0,
  `infrastructureVendor` tinyint(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `EquipmentVendor_name_key` (`name`)
);

CREATE TABLE `EquipmentModel` (
  `id`                int          NOT NULL AUTO_INCREMENT,
  `equipmentVendorId` int          NOT NULL,
  `name`              varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `EquipmentModel_equipmentVendorId_name_key` (`equipmentVendorId`,`name`),
  KEY `EquipmentModel_equipmentVendorId_fkey` (`equipmentVendorId`),
  CONSTRAINT `EquipmentModel_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `EquipmentStatus` (
  `id`      int          NOT NULL AUTO_INCREMENT,
  `name`    varchar(191) NOT NULL,
  `sortKey` int          DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `AntennaModel` (
  `id`                int          NOT NULL AUTO_INCREMENT,
  `name`              varchar(191) NOT NULL,
  `equipmentVendorId` int          NOT NULL,
  `horizontalBw`      double       DEFAULT NULL,
  `verticalBw`        double       DEFAULT NULL,
  `gainDbi`           double       DEFAULT NULL,
  `frontToBackRatio`  double       DEFAULT NULL,
  `electricalTilt`    double       DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AntennaModel_equipmentVendorId_name_key` (`equipmentVendorId`,`name`),
  CONSTRAINT `AntennaModel_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Msc` (
  `id`                int          NOT NULL AUTO_INCREMENT,
  `name`              varchar(191) NOT NULL,
  `clliCode`          varchar(191) NOT NULL,
  `equipmentVendorId` int          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Msc_name_key` (`name`),
  UNIQUE KEY `Msc_clliCode_key` (`clliCode`),
  KEY `Msc_equipmentVendorId_fkey` (`equipmentVendorId`),
  CONSTRAINT `Msc_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Bsc` (
  `id`                int          NOT NULL AUTO_INCREMENT,
  `name`              varchar(191) NOT NULL,
  `mscId`             int          NOT NULL,
  `equipmentVendorId` int          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bsc_name_key` (`name`),
  KEY `Bsc_mscId_fkey` (`mscId`),
  KEY `Bsc_equipmentVendorId_fkey` (`equipmentVendorId`),
  CONSTRAINT `Bsc_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bsc_mscId_fkey` FOREIGN KEY (`mscId`) REFERENCES `Msc` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Bts` (
  `id`                int         NOT NULL AUTO_INCREMENT,
  `siteId`            int         NOT NULL,
  `bscId`             int         NOT NULL,
  `number`            int         NOT NULL,
  `equipmentVendorId` int         NOT NULL,
  `equipmentModelId`  int         NOT NULL,
  `equipmentStatusId` int         NOT NULL,
  `onAirDate`         datetime(3) DEFAULT NULL,
  `createdAt`         datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById`       int         NOT NULL,
  `updatedAt`         datetime(3) DEFAULT NULL,
  `updatedById`       int         DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bts_bscId_number_key` (`bscId`,`number`),
  KEY `Bts_siteId_fkey` (`siteId`),
  KEY `Bts_equipmentVendorId_fkey` (`equipmentVendorId`),
  KEY `Bts_equipmentModelId_fkey` (`equipmentModelId`),
  KEY `Bts_equipmentStatusId_fkey` (`equipmentStatusId`),
  KEY `Bts_createdById_fkey` (`createdById`),
  KEY `Bts_updatedById_fkey` (`updatedById`),
  CONSTRAINT `Bts_bscId_fkey` FOREIGN KEY (`bscId`) REFERENCES `Bsc` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_equipmentModelId_fkey` FOREIGN KEY (`equipmentModelId`) REFERENCES `EquipmentModel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_equipmentVendorId_fkey` FOREIGN KEY (`equipmentVendorId`) REFERENCES `EquipmentVendor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_equipmentStatusId_fkey` FOREIGN KEY (`equipmentStatusId`) REFERENCES `EquipmentStatus` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bts_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Sector` (
  `id`                   int         NOT NULL AUTO_INCREMENT,
  `siteId`               int         NOT NULL,
  `number`               int         NOT NULL,
  `azimuth`              double      NOT NULL,
  `heightAgl`            double      NOT NULL,
  `mechanicalTilt`       double      NOT NULL,
  `antennaModelId`       int         NOT NULL,
  `sectorCoverageTypeId` int         NOT NULL,
  `createdAt`            datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById`          int         NOT NULL,
  `updatedAt`            datetime(3) DEFAULT NULL,
  `updatedById`          int         DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Sector_siteId_number_key` (`siteId`,`number`),
  KEY `Sector_antennaModelId_fkey` (`antennaModelId`),
  KEY `Sector_sectorCoverageTypeId_fkey` (`sectorCoverageTypeId`),
  KEY `Sector_createdById_fkey` (`createdById`),
  KEY `Sector_updatedById_fkey` (`updatedById`),
  CONSTRAINT `Sector_antennaModelId_fkey` FOREIGN KEY (`antennaModelId`) REFERENCES `AntennaModel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Sector_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Sector_sectorCoverageTypeId_fkey` FOREIGN KEY (`sectorCoverageTypeId`) REFERENCES `SectorCoverageType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Sector_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Sector_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Carrier` (
  `id`                   int         NOT NULL AUTO_INCREMENT,
  `btsId`                int         NOT NULL,
  `channelId`            int         NOT NULL,
  `carrierDesignationId` int         NOT NULL,
  `carrierTypeId`        int         NOT NULL,
  `equipmentStatusId`    int         NOT NULL,
  `onAirDate`            datetime(3) DEFAULT NULL,
  `createdAt`            datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById`          int         NOT NULL,
  `updatedAt`            datetime(3) DEFAULT NULL,
  `updatedById`          int         DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Carrier_createdById_fkey` (`createdById`),
  KEY `Carrier_updatedById_fkey` (`updatedById`),
  KEY `Carrier_carrierDesignationId_fkey` (`carrierDesignationId`),
  KEY `Carrier_carrierTypeId_fkey` (`carrierTypeId`),
  KEY `Carrier_equipmentStatusId_fkey` (`equipmentStatusId`),
  CONSTRAINT `Carrier_carrierDesignationId_fkey` FOREIGN KEY (`carrierDesignationId`) REFERENCES `CarrierDesignation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Carrier_carrierTypeId_fkey` FOREIGN KEY (`carrierTypeId`) REFERENCES `CarrierType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Carrier_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Carrier_equipmentStatusId_fkey` FOREIGN KEY (`equipmentStatusId`) REFERENCES `EquipmentStatus` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Carrier_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)