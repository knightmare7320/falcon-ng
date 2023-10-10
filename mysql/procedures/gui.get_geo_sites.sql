DROP PROCEDURE IF EXISTS gui.get_geo_sites;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_geo_sites(
   IN in_MIN_LATITUDE  FLOAT,
   IN in_MAX_LATITUDE  FLOAT,
   IN in_MIN_LONGITUDE FLOAT,
   IN in_MAX_LONGITUDE FLOAT
)
BEGIN
	SELECT   s.cascade_code, 
            s.latitude,
	         s.longitude
   FROM     locations.sites s
   WHERE    s.latitude  >= in_MIN_LATITUDE  AND
            s.latitude  <  in_MAX_LATITUDE  AND
            s.longitude >= in_MIN_LONGITUDE AND
            s.longitude <  in_MAX_LONGITUDE
   ORDER BY s.cascade_code;
END
$$
DELIMITER ;