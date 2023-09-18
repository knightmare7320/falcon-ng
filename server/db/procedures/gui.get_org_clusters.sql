CREATE DEFINER=`root`@`%` PROCEDURE `gui`.`get_org_clusters`(
   IN in_L5_MARKET_ID INT
)
BEGIN
   SET in_L5_MARKET_ID = IFNULL(in_L5_MARKET_ID, -1);

   select   org_cluster_id
          , org_cluster_name
   from     locations.org_clusters 
   where    in_L5_MARKET_ID = -1 OR l5_market_id = in_L5_MARKET_ID
   order by org_cluster_name;
end