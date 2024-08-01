DROP PROCEDURE IF EXISTS gui.get_org_clusters;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_org_clusters(
   IN in_L5_MARKET_ID INT
)
BEGIN
   SET in_L5_MARKET_ID = IFNULL(in_L5_MARKET_ID, -1);

   select   org_cluster_id   id
          , org_cluster_name name
          , l5_market_id     parent_id
   from     locations.org_clusters 
   where    in_L5_MARKET_ID = -1 OR l5_market_id = in_L5_MARKET_ID
   order by org_cluster_name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_org_clusters TO falcon;