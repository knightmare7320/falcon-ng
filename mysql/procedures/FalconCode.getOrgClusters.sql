DROP PROCEDURE IF EXISTS FalconCode.getOrgClusters;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getOrgClusters (
   IN in_L5_MARKET_ID INT
)
BEGIN
   SET in_L5_MARKET_ID = IFNULL(in_L5_MARKET_ID, -1);

   select   id   orgClusterId
          , name orgClusterName
          , l5MarketId
   from     FalconData.OrgCluster 
   where    in_L5_MARKET_ID = -1 OR l5MarketId = in_L5_MARKET_ID
   order by name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getOrgClusters TO falcon;