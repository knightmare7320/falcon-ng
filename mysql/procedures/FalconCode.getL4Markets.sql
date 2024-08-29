DROP PROCEDURE IF EXISTS FalconCode.getL4Markets;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getL4Markets(
   IN in_REGION_ID INT
)
BEGIN
   SET in_REGION_ID = IFNULL(in_REGION_ID, -1);

   select   `id` 
          , `name`
          , `regionId`
   from     FalconData.L4Market 
   where    in_REGION_ID = -1 OR regionId = in_REGION_ID
   order by `name`;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getL4Markets TO falcon;