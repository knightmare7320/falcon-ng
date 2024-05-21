CREATE DATABASE locations;

DROP TABLE IF EXISTS locations.repair_priorities;
CREATE TABLE locations.repair_priorities (
  repair_priority_id   int         NOT NULL AUTO_INCREMENT,
  repair_priority_name varchar(25) DEFAULT NULL,
  sort_key             int         DEFAULT NULL,
  PRIMARY KEY (repair_priority_id),
  UNIQUE KEY repair_priorities_UQ1 (repair_priority_name)
) AUTO_INCREMENT=6;

DROP TABLE IF EXISTS locations.site_types;
CREATE TABLE locations.site_types (
  site_type_id   int         NOT NULL AUTO_INCREMENT,
  site_type_name varchar(25) DEFAULT NULL,
  sort_key       int         DEFAULT NULL,
  PRIMARY KEY (site_type_id),
  UNIQUE KEY site_types_UQ1 (site_type_name)
) AUTO_INCREMENT=9;

DROP TABLE IF EXISTS locations.structure_types;
CREATE TABLE locations.structure_types (
  structure_type_id   int         NOT NULL AUTO_INCREMENT,
  structure_type_name varchar(50) NOT NULL,
  sort_key            int         DEFAULT NULL,
  PRIMARY KEY (structure_type_id),
  UNIQUE KEY structure_types_UQ1 (structure_type_name)
) AUTO_INCREMENT=16;

DROP TABLE IF EXISTS locations.timezones;
CREATE TABLE locations.timezones (
  timezone_id   int         NOT NULL AUTO_INCREMENT,
  timezone_name varchar(25) NOT NULL,
  sort_key      int         DEFAULT NULL,
  PRIMARY KEY (timezone_id),
  UNIQUE KEY timezones_UQ1 (timezone_name)
) AUTO_INCREMENT=9;


DROP TABLE IF EXISTS locations.regions;
CREATE TABLE locations.regions (
  region_id   int         NOT NULL AUTO_INCREMENT,
  region_name varchar(25) NOT NULL,
  PRIMARY KEY (region_id),
  UNIQUE KEY regions_UQ1 (region_name)
) AUTO_INCREMENT=6;


DROP TABLE IF EXISTS locations.l4_markets;
CREATE TABLE locations.l4_markets (
  l4_market_id   int         NOT NULL AUTO_INCREMENT,
  region_id      int         NOT NULL,
  l4_market_name varchar(25) NOT NULL,
  PRIMARY KEY (l4_market_id),
  UNIQUE KEY l4_markets_UQ1 (l4_market_name),
  KEY l4_markets_FK (region_id),
  CONSTRAINT l4_markets_FK FOREIGN KEY (region_id) REFERENCES regions (region_id)
) AUTO_INCREMENT=21;

DROP TABLE IF EXISTS locations.l5_markets;
CREATE TABLE locations.l5_markets (
  l5_market_id   int          NOT NULL AUTO_INCREMENT,
  l4_market_id   int          NOT NULL,
  l5_market_name varchar(50)  NOT NULL,
  PRIMARY KEY (l5_market_id),
  UNIQUE KEY l5_markets_UQ1 (l5_market_name),
  KEY l5_markets_FK (l4_market_id),
  CONSTRAINT l5_markets_FK FOREIGN KEY (l4_market_id) REFERENCES l4_markets (l4_market_id)
) AUTO_INCREMENT=72;

DROP TABLE IF EXISTS locations.org_clusters;
CREATE TABLE locations.org_clusters (
  org_cluster_id   int         NOT NULL AUTO_INCREMENT,
  l5_market_id     int         NOT NULL,
  org_cluster_name varchar(50) NOT NULL,
  PRIMARY KEY (org_cluster_id),
  UNIQUE KEY org_clusters_UQ1 (l5_market_id,org_cluster_name)
) AUTO_INCREMENT=893;


DROP TABLE IF EXISTS locations.market99s;
CREATE TABLE locations.market99s (
  market99_id   int          NOT NULL AUTO_INCREMENT,
  market99_name varchar(25)  NOT NULL,
  region_id     int          NOT NULL,
  PRIMARY KEY (market99_id),
  UNIQUE KEY market99s_UQ1 (market99_name),
  KEY market99s_FK (region_id),
  CONSTRAINT market99s_FK FOREIGN KEY (region_id) REFERENCES regions (region_id)
) AUTO_INCREMENT=6749;


DROP TABLE IF EXISTS locations.btas;
CREATE TABLE locations.btas (
  bta_id   int         NOT NULL AUTO_INCREMENT,
  bta_name varchar(50) NOT NULL,
  PRIMARY KEY (bta_id),
  UNIQUE KEY btas_UQ1 (bta_name)
) AUTO_INCREMENT=460;

DROP TABLE IF EXISTS locations.mtas;
CREATE TABLE locations.mtas (
  mta_id   int         NOT NULL AUTO_INCREMENT,
  mta_name varchar(50) NOT NULL,
  PRIMARY KEY (mta_id),
  UNIQUE KEY mtas_UQ1 (mta_name)
) AUTO_INCREMENT=49;

DROP TABLE IF EXISTS locations.sites;
CREATE TABLE locations.sites (
  site_id            int           NOT NULL AUTO_INCREMENT,
  cascade_code       varchar(20)   NOT NULL,
  site_name          varchar(50)   DEFAULT NULL,
  site_type_id       int           NOT NULL,
  address1           varchar(100)  DEFAULT NULL,
  address2           varchar(100)  DEFAULT NULL,
  city               varchar(50)   DEFAULT NULL,
  state              varchar(2)    DEFAULT NULL,
  zip_code           varchar(11)   DEFAULT NULL,
  county             varchar(25)   DEFAULT NULL,
  latitude           decimal(10,6) NOT NULL,
  longitude          decimal(10,6) NOT NULL,
  elevation_feet     decimal(10,1) DEFAULT NULL,
  structure_type_id  int           DEFAULT NULL,
  repair_priority_id int           DEFAULT NULL,
  timezone_id        int           DEFAULT NULL,
  region_id          int           DEFAULT NULL,
  market99_id        int           DEFAULT NULL,
  l4_market_id       int           DEFAULT NULL,
  l5_market_id       int           DEFAULT NULL,
  org_cluster_id     int           DEFAULT NULL,
  mta_id             int           DEFAULT NULL,
  bta_id             int           DEFAULT NULL,
  created_by_name    varchar(100)  DEFAULT NULL,
  create_date        DATETIME      NOT NULL,
  modified_by_name   varchar(100)  DEFAULT NULL,
  modified_date      DATETIME      DEFAULT NULL,
  geo_point point NOT NULL /*!80003 SRID 4326 */,
  PRIMARY KEY (site_id),
  UNIQUE KEY sites_UQ1 (cascade_code),
  KEY sites_latitude_IX1 (latitude,longitude),
  SPATIAL KEY site_GX1 (geo_point)
);
CREATE TRIGGER locations.TRG_INS_sites BEFORE INSERT ON sites FOR EACH ROW SET NEW.geo_point = st_srid(point(NEW.longitude,NEW.latitude),4326);
CREATE TRIGGER locations.TRG_UPD_sites BEFORE UPDATE ON sites FOR EACH ROW SET NEW.geo_point = st_srid(point(NEW.longitude,NEW.latitude),4326);