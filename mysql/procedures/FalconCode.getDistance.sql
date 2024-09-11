DROP PROCEDURE IF EXISTS FalconCode.getDistance;

DELIMITER $$
$$
CREATE FUNCTION FalconCode.getDistance(
        lat1 DOUBLE, lon1 DOUBLE, 
        lat2 DOUBLE, lon2 DOUBLE
     ) RETURNS DOUBLE
    NO SQL
    DETERMINISTIC
    COMMENT 'Returns the haversine distance in miles, between point (lat1,lon1) and point (lat2,lon2)'
    BEGIN

    RETURN 7917* 
       ASIN(
          SQRT(
             (1-COS(RADIANS(lat2 - lat1)) + COS(lat1) * COS(lat2) * (1-COS(RADIANS(lon2 - lon1)))/2)
          )
       );
END
$$
DELIMITER ;

GRANT EXECUTE ON FUNCTION FalconCode.getDistance TO falcon;