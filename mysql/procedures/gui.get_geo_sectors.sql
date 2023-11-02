CREATE PROCEDURE gui.get_geo_sectors(
   IN in_MIN_LATITUDE  FLOAT,
   IN in_MAX_LATITUDE  FLOAT,
   IN in_MIN_LONGITUDE FLOAT,
   IN in_MAX_LONGITUDE FLOAT
)
BEGIN
   DECLARE v_geo_boundary POLYGON;
   SET v_geo_boundary = st_srid(polygon(linestring(
                           point(in_MIN_LONGITUDE,in_MAX_LATITUDE), 
                           point(in_MIN_LONGITUDE,in_MIN_LATITUDE), 
                           point(in_MAX_LONGITUDE,in_MIN_LATITUDE), 
                           point(in_MAX_LONGITUDE,in_MAX_LATITUDE), 
                           point(in_MIN_LONGITUDE,in_MAX_LATITUDE)
                        )),4326);
                     
   SELECT   s.cascade_code, 
            s.latitude,
	         s.longitude,
	         se.sector_number,
	         se.azimuth,
	         a.horizontal_bw
   FROM     locations.sites s 
            JOIN equipment.sectors se ON s.cascade_code = se.cascade_code 
            JOIN equipment.antennas a ON a.antenna_id = se.antenna_id         
   WHERE    st_contains(v_geo_boundary, s.geo_point)   
   ORDER BY s.cascade_code;
END