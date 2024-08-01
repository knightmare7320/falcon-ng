DROP PROCEDURE IF EXISTS gui.get_timezones;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_timezones()
BEGIN
   SELECT   timezone_id   AS id
          , timezone_name AS name
          , sort_key
   FROM     locations.timezones
   ORDER BY sort_key
          , timezone_name ;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_timezones TO falcon;