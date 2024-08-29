DROP PROCEDURE IF EXISTS FalconCode.getRegions;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getRegions()
BEGIN
   select   `id` 
          , `name`
   from     FalconData.Region
   order by `name`;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getRegions TO falcon;