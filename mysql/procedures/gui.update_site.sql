DROP PROCEDURE IF EXISTS gui.update_site;

DELIMITER $$
$$
CREATE PROCEDURE gui.update_site(
   IN in_SITE_ID            INT,
   IN in_CASCADE_CODE       VARCHAR(20),
   IN in_SITE_NAME          VARCHAR(20),
   IN in_SITE_TYPE_ID       INT,
   IN in_ADDRESS1           VARCHAR(100),
   IN in_CITY               VARCHAR(50),
   IN in_STATE              VARCHAR(2),
   IN in_ZIP_CODE           VARCHAR(11),
   IN in_COUNTY             VARCHAR(25),
   IN in_LATITUDE           FLOAT,
   IN in_LONGITUDE          FLOAT,
   IN in_ELEVATION_FEET     FLOAT,
   IN in_STRUCTURE_TYPE_ID  INT,
   IN in_REPAIR_PRIORITY_ID INT,
   IN in_TIMEZONE_ID        INT,
   IN in_REGION_ID          INT,
   IN in_L4_MARKET_ID       INT,
   IN in_L5_MARKET_ID       INT,
   IN in_ORG_CLUSTER_ID     INT,
   IN in_USER_ID            INT
)
BEGIN
  DECLARE v_USER_NAME VARCHAR(100);
 
  DECLARE exit handler for SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
          @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
      SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
      SELECT @full_error;
    END;
  
 
  SELECT coalesce(username, concat(coalesce(first_name, ''), ' ', coalesce(last_name, '')), 'UNKNOWN')
  INTO   v_USER_NAME
  FROM   users.user_names
  WHERE  user_id = in_USER_ID;
 
  UPDATE locations.sites
  SET    cascade_code       = in_CASCADE_CODE,
         site_name          = in_SITE_NAME,
         site_type_id       = in_SITE_TYPE_ID,
         address1           = in_ADDRESS1,
         city               = in_CITY,
         state              = in_STATE,
         zip_code           = in_ZIP_CODE,
         county             = in_COUNTY,
         latitude           = in_LATITUDE,
         longitude          = in_LONGITUDE,
         elevation_feet     = in_ELEVATION_FEET,
         structure_type_id  = in_STRUCTURE_TYPE_ID,
         repair_priority_id = in_REPAIR_PRIORITY_ID,
         timezone_id        = in_TIMEZONE_ID,
         region_id          = in_REGION_ID,
         l4_market_id       = in_L4_MARKET_ID,
         l5_market_id       = in_L5_MARKET_ID,
         org_cluster_id     = in_ORG_CLUSTER_ID,
         modified_by_name   = in_USER_NAME,
         modified_date      = NOW()
  WHERE  site_id = in_SITE_ID;
 
  SELECT 'OK' AS status;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.update_site TO falcon;