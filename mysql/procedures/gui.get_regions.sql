DROP PROCEDURE IF EXISTS gui.get_regions;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_regions()
BEGIN
   select   region_id   id 
          , region_name name
   from     locations.regions 
   order by region_name;
END
$$
DELIMITER ;