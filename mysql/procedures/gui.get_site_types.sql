DROP PROCEDURE IF EXISTS gui.get_site_types;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_site_types()
BEGIN
   SELECT   site_type_id   AS id
          , site_type_name AS name
          , sort_key
   FROM     locations.site_types 
   ORDER BY sort_key
          , site_type_name;
END
$$
DELIMITER ;