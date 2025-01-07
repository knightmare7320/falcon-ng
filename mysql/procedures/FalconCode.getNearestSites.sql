DROP PROCEDURE IF EXISTS FalconCode.getNearestSites;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getNearestSites (
   IN in_CASCADE_CODE   VARCHAR(50)
)
BEGIN
   
   SELECT   s2.cascadeCode
          , s2.name siteName
          , s2.address
          , s2.city
          , s2.state
          , round(getDistance(s1.latitude,s1.longitude,s2.latitude,s2.longitude),1) distanceMi
          , decodeDirection(getAzimuth(s1.latitude,s1.longitude,s2.latitude,s2.longitude)) bearing
   FROM     FalconData.Site s1
   join     FalconData.Site s2 
            on  s1.cascadeCode != s2.cascadeCode 
            and s2.latitude  between s1.latitude -0.5 and s1.latitude +0.5 
            and s2.longitude between s1.longitude-0.5 and s1.longitude+0.5 
   WHERE    s1.cascadeCode  = in_CASCADE_CODE
   AND      s2.latitude     is not null 
   AND      s2.longitude    is not null
   ORDER BY getDistance(s1.latitude,s1.longitude,s2.latitude,s2.longitude) 
   LIMIT 10;
   
END
$$

DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getNearestSites TO falcon;