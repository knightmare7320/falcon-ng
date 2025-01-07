DROP PROCEDURE IF EXISTS FalconCode.getOrgClustersPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getOrgClustersPerf (
   IN in_L5_MARKET_ID INT,
   IN in_FILTER_STR   VARCHAR(50),
   IN in_ORDER_BY     VARCHAR(50),
   IN in_ORDER_DIR    VARCHAR(10),
   IN in_PAGE_NUMBER  INT,
   IN in_PAGE_SIZE    INT
)
BEGIN  
   DECLARE v_OFFSET INT;

   SET in_PAGE_NUMBER = IFNULL(in_PAGE_NUMBER, 1);
   SET in_PAGE_SIZE   = IFNULL(in_PAGE_SIZE, 10);
  
   -- Calculate the offset
   SET v_OFFSET = (in_PAGE_NUMBER - 1) * in_PAGE_SIZE;

   SET in_FILTER_STR = lower(
      coalesce(
         trim(in_FILTER_STR), 
         ''
      )
   );


   SELECT   l4.id        l4MarketId
          , l4.name      l4MarketName
          , l5.id        l5MarketId
          , l5.name      l5MarketName
          , count(l5.id) totalRowCount
   FROM     FalconData.L4Market l4
            JOIN      FalconData.L5Market   l5 ON l5.l4MarketId   = l4.id
            left join FalconData.OrgCluster oc ON oc.l5MarketId = l5.id
   WHERE    l5.id = in_L5_MARKET_ID
   AND      lower(oc.name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY l4.id
          , l4.name
          , l5.id
          , l5.name;               
   
   SELECT   id   orgClusterId
          , name orgClusterName 
          , null setupAttempts
          , null primaryBlocks
          , null accessFailures
          , null successulCalls
          , null primaryDrops
          , null primaryErlangs
   FROM     FalconData.OrgCluster
   WHERE    l5MarketId = in_L5_MARKET_ID
   AND      lower(name) like CONCAT('%', in_FILTER_STR, '%')
   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then name end desc
          , name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getOrgClustersPerf TO falcon;