DROP PROCEDURE IF EXISTS FalconCode.getSiteTypes;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteTypes()
BEGIN
   SELECT   id siteTypeId
          , name siteTypeName
   FROM     FalconData.SiteType 
   ORDER BY sortKey
          , name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteTypes TO falcon;