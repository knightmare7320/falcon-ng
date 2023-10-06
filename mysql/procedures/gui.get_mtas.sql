DROP PROCEDURE IF EXISTS gui.get_mtas;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_mtas()
BEGIN
   select   mta_id
          , mta_name 
   from     locations.mtas
   order by mta_name;
END
$$
DELIMITER ;