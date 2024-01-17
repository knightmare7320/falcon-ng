DROP PROCEDURE IF EXISTS gui.get_quicksearch;

DELIMITER $$
$$CREATE PROCEDURE gui.get_quicksearch(
  IN in_SEARCH VARCHAR(50),
  IN in_LAT    NUMERIC,
  IN in_LONG   NUMERIC
)
BEGIN
   DECLARE v_POINT POINT;

   if in_LAT is not null and in_LONG is not null then
      SET v_POINT = st_srid(point(in_LONG,in_LAT),4326);
   end if;

   SELECT   cascade_code
          , site_name
          , address1
          , city
          , state
          , zip_code
          , round(
               st_distance_sphere(s.geo_point, v_POINT) * 0.000621371
               , 2
            ) distance_mi
   FROM     locations.sites s
   WHERE    (   lower(cascade_code) like concat('%', lower(in_SEARCH), '%')
             or lower(site_name)    like concat('%', lower(in_SEARCH), '%')
             or lower(address1)     like concat('%', lower(in_SEARCH), '%')
             or lower(city)         like concat('%', lower(in_SEARCH), '%')
             or lower(zip_code)     like concat('%', lower(in_SEARCH), '%')
            )
   ORDER BY case when in_LAT and in_LONG then st_distance_sphere(s.geo_point, v_POINT) else 1 end
          , cascade_code ASC
   LIMIT 10;
   
END
$$
DELIMITER ;