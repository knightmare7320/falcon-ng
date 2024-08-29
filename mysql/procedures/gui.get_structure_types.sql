DROP PROCEDURE IF EXISTS gui.get_structure_types;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_structure_types()
BEGIN
   SELECT   structure_type_id   AS id
          , structure_type_name AS name
          , sort_key
   FROM     locations.structure_types
   ORDER BY sort_key
          , structure_type_name ;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_structure_types TO falcon;