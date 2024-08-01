DROP PROCEDURE IF EXISTS gui.get_azimuth;

DELIMITER $$
$$
CREATE FUNCTION gui.get_azimuth(
        lat1 DOUBLE, lon1 DOUBLE, 
        lat2 DOUBLE, lon2 DOUBLE
     ) RETURNS DOUBLE
    NO SQL
    DETERMINISTIC
    COMMENT 'Returns the initial bearing, in degrees, to follow the great circle route
             from point (lat1,lon1), to point (lat2,lon2)'
    BEGIN

    RETURN (360.0 + 
      DEGREES(ATAN2(
       SIN(RADIANS(lon2-lon1))*COS(RADIANS(lat2)),
       COS(RADIANS(lat1))*SIN(RADIANS(lat2))-SIN(RADIANS(lat1))*COS(RADIANS(lat2))*
            COS(RADIANS(lon2-lon1))
      ))
     ) % 360.0;
END
$$
DELIMITER ;

GRANT EXECUTE ON FUNCTION gui.get_azimuth TO falcon;