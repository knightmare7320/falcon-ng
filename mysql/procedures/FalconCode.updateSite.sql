DROP PROCEDURE IF EXISTS FalconCode.updateSite;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.updateSite (
   IN in_SITE_ID            INT,
   IN in_CASCADE_CODE       VARCHAR(20),
   IN in_SITE_NAME          VARCHAR(20),
   IN in_SITE_TYPE_ID       INT,
   IN in_ADDRESS            VARCHAR(100),
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
   IN in_ORG_CLUSTER_ID     INT,
   IN in_USER_ID            INT
)
BEGIN
  DECLARE exit handler for SQLEXCEPTION
    BEGIN
      GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
          @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
      SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
      SELECT @full_error;
    END;
  
 
  UPDATE FalconData.Site
  SET    cascadeCode      = in_CASCADE_CODE,
         name             = in_SITE_NAME,
         siteTypeId       = in_SITE_TYPE_ID,
         address          = in_ADDRESS1,
         city             = in_CITY,
         state            = in_STATE,
         zipCode          = in_ZIP_CODE,
         county           = in_COUNTY,
         latitude         = in_LATITUDE,
         longitude        = in_LONGITUDE,
         elevation        = in_ELEVATION_FEET,
         structureTypeId  = in_STRUCTURE_TYPE_ID,
         repairPriorityId = in_REPAIR_PRIORITY_ID,
         timezoneId       = in_TIMEZONE_ID,
         orgClusterId     = in_ORG_CLUSTER_ID,
         updatedById      = in_USER_ID,
         updatedAt        = NOW()
  WHERE  id = in_SITE_ID;
 
  SELECT 'OK' AS status;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.updateSite TO falcon;