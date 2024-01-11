DROP PROCEDURE IF EXISTS gui.get_bscs;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_nearest_sites(
   IN in_CASCADE_CODE   VARCHAR(50)
)
BEGIN
   
   SELECT   s2.cascade_code
          , round(
               st_distance_sphere(s1.geo_point, s2.geo_point) * 0.000621371
               , 2
            ) distance_mi
          , gui.get_direction(
               gui.get_azimuth(s1.latitude, s1.longitude, s2.latitude, s2.longitude)
            ) bearing
   FROM     locations.sites s1
          , locations.sites s2
   WHERE    s1.cascade_code  = in_CASCADE_CODE
   AND      s2.cascade_code != in_CASCADE_CODE
   AND      s2.latitude     is not null 
   AND      s2.longitude    is not null
   AND      st_distance_sphere(s1.geo_point, s2.geo_point) < 8000
   ORDER BY st_distance_sphere(s1.geo_point, s2.geo_point)
   LIMIT 10;
   
END
$$

DELIMITER ;