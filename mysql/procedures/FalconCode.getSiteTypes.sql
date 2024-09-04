DROP PROCEDURE IF EXISTS FalconCode.getSiteTypes;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteTypes()
BEGIN
   SELECT   id
          , name
   FROM     FalconData.SiteType 
   ORDER BY sortKey
          , name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteTypes TO falcon;