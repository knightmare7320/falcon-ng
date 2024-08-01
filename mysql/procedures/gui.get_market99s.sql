DROP PROCEDURE IF EXISTS gui.get_market99s;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_market99s(
   IN in_REGION_ID INT
)
BEGIN
   SET in_REGION_ID = IFNULL(in_REGION_ID, -1);

   select   market99_id   id
          , market99_name name
          , region_id     parent_id
   from     locations.market99s  
   where    in_REGION_ID = -1 OR region_id = in_REGION_ID
   order by market99_name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_market99s TO falcon;