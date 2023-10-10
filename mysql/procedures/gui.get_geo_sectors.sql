DROP PROCEDURE IF EXISTS gui.get_geo_sectors;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_geo_sectors(
   IN in_MIN_LATITUDE  FLOAT,
   IN in_MAX_LATITUDE  FLOAT,
   IN in_MIN_LONGITUDE FLOAT,
   IN in_MAX_LONGITUDE FLOAT
)
BEGIN
   SELECT   s.cascade_code, 
            s.latitude,
	        s.longitude,
	        se.sector_number,
	        se.azimuth,
	        a.horizontal_bw
   FROM     locations.sites s 
            JOIN equipment.sectors se ON s.cascade_code = se.cascade_code 
            JOIN equipment.antennas a ON a.antenna_id = se.antenna_id         
   WHERE    s.latitude  >= in_MIN_LATITUDE  AND
            s.latitude  <  in_MAX_LATITUDE  AND
            s.longitude >= in_MIN_LONGITUDE AND
            s.longitude <  in_MAX_LONGITUDE
   ORDER BY s.cascade_code,
            se.sector_number;
END
$$
DELIMITER ;