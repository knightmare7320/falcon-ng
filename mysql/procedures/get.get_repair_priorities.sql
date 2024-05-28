DROP PROCEDURE IF EXISTS gui.get_repair_priorities;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_repair_priorities()
BEGIN
   SELECT   repair_priority_id   AS id
          , repair_priority_name AS name
          , sort_key
   FROM     locations.repair_priorities
   ORDER BY sort_key
          , repair_priority_name ;
END
$$
DELIMITER ;