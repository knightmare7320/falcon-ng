DROP PROCEDURE IF EXISTS FalconCode.getTimezones;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getTimezones()
BEGIN
   SELECT   id timezoneId
          , name timezoneName
   FROM     FalconData.Timezone
   ORDER BY sortKey
          , name ;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getTimezones TO falcon;