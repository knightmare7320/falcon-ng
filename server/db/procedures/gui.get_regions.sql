DROP PROCEDURE IF EXISTS gui.get_regions;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_regions()
BEGIN
   select   region_id
          , region_name 
   from     locations.regions 
   order by region_name;
END
$$
DELIMITER ;