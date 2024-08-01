CREATE DATABASE equipment ;

DROP TABLE IF EXISTS equipment.technologies;
CREATE TABLE equipment.technologies (
  technology_id   int         NOT NULL AUTO_INCREMENT,
  technology_name varchar(10) NOT NULL,
  sort_key        int         DEFAULT NULL,
  PRIMARY KEY (technology_id),
  UNIQUE KEY technologies_UQ1 (technology_name)
);

DROP TABLE IF EXISTS equipment.equipment_vendors;
CREATE TABLE equipment.equipment_vendors (
  equipment_vendor_id        int         NOT NULL AUTO_INCREMENT,
  equipment_vendor_name      varchar(25) NOT NULL,
  antenna_vendor_fg          char(1)     NOT NULL,
  bts_vendor_fg              char(1)     NOT NULL,
  PRIMARY KEY (equipment_vendor_id),
  UNIQUE KEY equipment_vendors_UQ1 (equipment_vendor_name)
);

DROP TABLE IF EXISTS equipment.equipment_model_types;
CREATE TABLE equipment.equipment_model_types (
  equipment_model_type_id   int         NOT NULL AUTO_INCREMENT,
  equipment_model_type_name varchar(25) NOT NULL,
  PRIMARY KEY (equipment_model_type_id),
  UNIQUE KEY equipment_model_types_UQ1 (equipment_model_type_name)
);

DROP TABLE IF EXISTS equipment.equipment_statuses;
CREATE TABLE equipment.equipment_statuses (
  equipment_status_id   int         NOT NULL AUTO_INCREMENT,
  equipment_status_name varchar(25) NOT NULL,
  sort_key              int         DEFAULT NULL,
  PRIMARY KEY (equipment_status_id),
  UNIQUE KEY equipment_statuses_UQ1 (equipment_status_name)
);

DROP TABLE IF EXISTS equipment.sector_coverage_types;
CREATE TABLE equipment.sector_coverage_types (
  sector_coverage_type_id   int         NOT NULL AUTO_INCREMENT,
  sector_coverage_type_name varchar(25) NOT NULL,
  sort_key                  int         DEFAULT NULL,
  PRIMARY KEY (sector_coverage_type_id),
  UNIQUE KEY sector_coverage_types_UQ1 (sector_coverage_type_name)
);

DROP TABLE IF EXISTS equipment.bts_types;
CREATE TABLE equipment.bts_types (
  bts_type_id   int         NOT NULL AUTO_INCREMENT,
  bts_type_name varchar(25) NOT NULL,
  sort_key      int         DEFAULT NULL,
  PRIMARY KEY (bts_type_id),
  UNIQUE KEY bts_types_UQ1 (bts_type_name)
);

DROP TABLE IF EXISTS equipment.carrier_designations;
CREATE TABLE equipment.carrier_designations (
  carrier_designation_id   int           NOT NULL AUTO_INCREMENT,
  carrier_designation_name varchar(25)   NOT NULL,
  sort_key                 int           DEFAULT NULL,
  PRIMARY KEY (carrier_designation_id),
  UNIQUE KEY carrier_designations_UQ1 (carrier_designation_name)
);

DROP TABLE IF EXISTS equipment.carrier_types;
CREATE TABLE equipment.carrier_types (
  carrier_type_id   int         NOT NULL AUTO_INCREMENT,
  carrier_type_name varchar(25) NOT NULL,
  sort_key          int         DEFAULT NULL,
  PRIMARY KEY (carrier_type_id),
  UNIQUE KEY carrier_types_UQ1 (carrier_type_name)
);

DROP TABLE IF EXISTS equipment.channels;
CREATE TABLE equipment.channels (
  channel_id     int NOT NULL AUTO_INCREMENT,
  channel_number int NOT NULL,
  PRIMARY KEY (channel_id),
  UNIQUE KEY channels_UQ1 (channel_number)
);


DROP TABLE IF EXISTS equipment.equipment_models;
CREATE TABLE equipment.equipment_models (
  equipment_model_id      int         NOT NULL AUTO_INCREMENT,
  equipment_model_type_id int         NOT NULL,
  equipment_vendor_id     int         NOT NULL,
  equipment_model_name    varchar(25) NOT NULL,
  PRIMARY KEY (equipment_model_id),
  KEY equipment_models_FK1 (equipment_vendor_id),
  KEY equipment_models_FK2 (equipment_model_type_id),
  CONSTRAINT equipment_models_FK1 FOREIGN KEY (equipment_vendor_id)     REFERENCES equipment_vendors (equipment_vendor_id),
  CONSTRAINT equipment_models_FK2 FOREIGN KEY (equipment_model_type_id) REFERENCES equipment_model_types (equipment_model_type_id)
);

DROP TABLE IF EXISTS equipment.equipment_sw_loads;
CREATE TABLE equipment.equipment_sw_loads (
  equipment_sw_load_id   int         NOT NULL AUTO_INCREMENT,
  equipment_sw_load_name varchar(25) NOT NULL,
  PRIMARY KEY (equipment_sw_load_id),
  UNIQUE KEY equipment_sw_loads_UQ1 (equipment_sw_load_name)
);


DROP TABLE IF EXISTS equipment.switches;
CREATE TABLE equipment.switches (
  switch_id           int         NOT NULL AUTO_INCREMENT,
  switch_name         varchar(50) NOT NULL,
  clli_code           varchar(25) NOT NULL,
  equipment_vendor_id int         NOT NULL,
  PRIMARY KEY (switch_id),
  UNIQUE KEY switches_UQ1 (clli_code),
  UNIQUE KEY switches_UQ2 (switch_name),
  KEY switches_FK (equipment_vendor_id),
  CONSTRAINT switches_FK FOREIGN KEY (equipment_vendor_id) REFERENCES equipment.equipment_vendors (equipment_vendor_id)
);

DROP TABLE IF EXISTS equipment.antennas;
CREATE TABLE equipment.antennas (
  antenna_id          int           NOT NULL AUTO_INCREMENT,
  equipment_vendor_id int           NOT NULL,
  antenna_name        varchar(50)   NOT NULL,
  horizontal_bw       decimal(10,0) DEFAULT NULL,
  vertical_bw         decimal(10,0) DEFAULT NULL,
  gain_dbi            decimal(10,1) DEFAULT NULL,
  front_to_back_ratio decimal(10,1) DEFAULT NULL,
  electrical_tilt     decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (antenna_id),
  KEY antennas_FK (equipment_vendor_id),
  CONSTRAINT antennas_FK FOREIGN KEY (equipment_vendor_id) REFERENCES equipment.equipment_vendors (equipment_vendor_id)
);

DROP TABLE IF EXISTS equipment.bscs;
CREATE TABLE equipment.bscs (
  bsc_id              int         NOT NULL AUTO_INCREMENT,
  bsc_name            varchar(50) NOT NULL,
  switch_id           int         NOT NULL,
  bsc_number          varchar(25) NOT NULL,
  equipment_vendor_id int         NOT NULL,
  PRIMARY KEY (bsc_id),
  UNIQUE KEY bscs_UQ1 (bsc_name),
  UNIQUE KEY bscs_UQ2 (switch_id,bsc_number),
  KEY bscs_FK2 (equipment_vendor_id),
  CONSTRAINT bscs_FK1 FOREIGN KEY (switch_id)           REFERENCES equipment.switches (switch_id),
  CONSTRAINT bscs_FK2 FOREIGN KEY (equipment_vendor_id) REFERENCES equipment.equipment_vendors (equipment_vendor_id)
);

DROP TABLE IF EXISTS equipment.bts;
CREATE TABLE equipment.bts (
  bts_id               int          NOT NULL AUTO_INCREMENT,
  cascade_code         varchar(25)  NOT NULL,
  switch_id            int          NOT NULL,
  bsc_id               int          NOT NULL,
  bts_number           int          NOT NULL,
  bts_number_bsc       int          DEFAULT NULL,
  bts_type_id          int          NOT NULL,
  equipment_status_id  int          NOT NULL,
  equipment_vendor_id  int          NOT NULL,
  equipment_model_id   int          NOT NULL,
  equipment_sw_load_id int          NOT NULL,
  on_air_date          DATE         DEFAULT NULL,
  created_by_name      varchar(100) DEFAULT NULL,
  create_date          DATETIME     NOT NULL,
  modified_by_name     varchar(100) DEFAULT NULL,
  modified_date        DATETIME     DEFAULT NULL,
  PRIMARY KEY (bts_id),
  KEY bts_IX1 (cascade_code)
);

DROP TABLE IF EXISTS equipment.carriers;
CREATE TABLE equipment.carriers (
  carrier_id             int          NOT NULL AUTO_INCREMENT,
  bts_id                 int          NOT NULL,
  channel_id             int          NOT NULL,
  carrier_number         varchar(10)  NOT NULL,
  carrier_designation_id int          NOT NULL,
  carrier_type_id        int          NOT NULL,
  equipment_status_id    int          NOT NULL,
  on_air_date            DATE         DEFAULT NULL,
  created_by_name        varchar(100) DEFAULT NULL,
  create_date            DATETIME     NOT NULL,
  modified_by_name       varchar(100) DEFAULT NULL,
  modified_date          DATETIME     DEFAULT NULL,
  PRIMARY KEY (carrier_id),
  KEY carriers_FK1 (bts_id),
  KEY carriers_FK2 (channel_id),
  KEY carriers_FK3 (carrier_type_id),
  KEY carriers_FK4 (equipment_status_id),
  CONSTRAINT carriers_FK1 FOREIGN KEY (bts_id)              REFERENCES bts (bts_id),
  CONSTRAINT carriers_FK2 FOREIGN KEY (channel_id)          REFERENCES channels (channel_id),
  CONSTRAINT carriers_FK3 FOREIGN KEY (carrier_type_id)     REFERENCES carrier_types (carrier_type_id),
  CONSTRAINT carriers_FK4 FOREIGN KEY (equipment_status_id) REFERENCES equipment_statuses (equipment_status_id)
);

DROP TABLE IF EXISTS equipment.sectors;
CREATE TABLE equipment.sectors (
  sector_id               int           NOT NULL AUTO_INCREMENT,
  cascade_code            varchar(25)   NOT NULL,
  sector_number           int           NOT NULL,
  azimuth                 decimal(10,0) DEFAULT NULL,
  height_agl              decimal(10,0) DEFAULT NULL,
  mechanical_tilt         decimal(10,0) DEFAULT NULL,
  antenna_id              int           DEFAULT NULL,
  sector_coverage_type_id int           DEFAULT NULL,
  radius_meters           decimal(10,0) DEFAULT NULL,
  created_by_name         varchar(100)  DEFAULT NULL,
  create_date             DATETIME      NOT NULL,
  modified_by_name        varchar(100)  DEFAULT NULL,
  modified_date           DATETIME      DEFAULT NULL,
  PRIMARY KEY (sector_id),
  KEY sectors_IX1 (cascade_code)
);