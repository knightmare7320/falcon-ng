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
  --  DECLARE v_geo_boundary POLYGON;
  --  SET v_geo_boundary = st_srid(polygon(linestring(
  --                          point(in_MIN_LONGITUDE,in_MAX_LATITUDE), 
  --                          point(in_MIN_LONGITUDE,in_MIN_LATITUDE), 
  --                          point(in_MAX_LONGITUDE,in_MIN_LATITUDE), 
  --                          point(in_MAX_LONGITUDE,in_MAX_LATITUDE), 
  --                          point(in_MIN_LONGITUDE,in_MAX_LATITUDE)
  --                       )),4326);

	SELECT   s.cascade_code, 
            s.latitude,
	         s.longitude
   FROM     locations.sites s
  --  WHERE    st_contains(v_geo_boundary, geo_point) -- st_srid(point(longitude,latitude),4326)
   WHERE    s.latitude  between in_MIN_LATITUDE and in_MAX_LATITUDE
   and      s.longitude between in_MIN_LONGITUDE and in_MAX_LONGITUDE  
   ORDER BY s.cascade_code;
END
$$
DELIMITER ;