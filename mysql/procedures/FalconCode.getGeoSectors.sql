DROP PROCEDURE IF EXISTS FalconCode.getGeoSectors;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getGeoSectors(
   IN in_MIN_LATITUDE  FLOAT,
   IN in_MAX_LATITUDE  FLOAT,
   IN in_MIN_LONGITUDE FLOAT,
   IN in_MAX_LONGITUDE FLOAT
)
BEGIN
--    DECLARE v_geo_boundary POLYGON;
--    SET v_geo_boundary = st_srid(polygon(linestring(
--                            point(in_MIN_LONGITUDE,in_MAX_LATITUDE), 
--                            point(in_MIN_LONGITUDE,in_MIN_LATITUDE), 
--                            point(in_MAX_LONGITUDE,in_MIN_LATITUDE), 
--                            point(in_MAX_LONGITUDE,in_MAX_LATITUDE), 
--                            point(in_MIN_LONGITUDE,in_MAX_LATITUDE)
--                         )),4326);
                     
   SELECT   s.cascadeCode, 
            s.latitude,
	          s.longitude,
	          se.number,
	          se.azimuth,
	          a.horizontalBw
   FROM     FalconData.Site s 
            JOIN FalconData.Sector       se ON s.id = se.siteId 
            JOIN FalconData.AntennaModel a  ON a.id = se.antennaModelId         
--    WHERE    st_contains(v_geo_boundary, s.geo_point)
   WHERE    s.latitude  between in_MIN_LATITUDE and in_MAX_LATITUDE
   and      s.longitude between in_MIN_LONGITUDE and in_MAX_LONGITUDE  
   ORDER BY s.cascadeCode;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getGeoSectors TO falcon;