DROP PROCEDURE IF EXISTS FalconCode.getGeoSites;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getGeoSites(
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

	 SELECT   cascadeCode, 
            latitude,
	          longitude
   FROM     FalconData.Site
  --  WHERE    st_contains(v_geo_boundary, geo_point) -- st_srid(point(longitude,latitude),4326)
   WHERE    latitude  between in_MIN_LATITUDE and in_MAX_LATITUDE
   and      longitude between in_MIN_LONGITUDE and in_MAX_LONGITUDE  
   ORDER BY cascadeCode;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getGeoSites TO falcon;