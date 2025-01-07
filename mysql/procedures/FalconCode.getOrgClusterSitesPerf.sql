DROP PROCEDURE IF EXISTS FalconCode.getOrgClusterSitesPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getOrgClusterSitesPerf (
   IN in_ORG_CLUSTER_ID   INT,
   IN in_FILTER_STR   VARCHAR(50),
   IN in_ORDER_BY    VARCHAR(50),
   IN in_ORDER_DIR   VARCHAR(10),
   IN in_PAGE_NUMBER INT,
   IN in_PAGE_SIZE   INT
)
BEGIN
   DECLARE total_records INT;
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

   -- Get the total number of records
   select   l5.id       l5MarketId
          , l5.name     l5MarketName
          , oc.name     orgClusterName
          , count(s.id) totalRowCount
   from     FalconData.Site       s
   join     FalconData.OrgCluster oc on oc.id = s.orgClusterId
   join     FalconData.L5Market   l5 on l5.id = oc.l5MarketId
   where    oc.id = in_ORG_CLUSTER_ID
   group by l5.id
          , l5.name
          , oc.name;
  
   select   id          siteId
          , cascadeCode
          , name        siteName
          , null        setupAttempts
          , null        equipmentBlocks
          , null        accessFailures
          , null        successfulCalls
          , null        primaryDrops
          , null        primaryErlangs
   from     FalconData.Site
   where    orgClusterId = in_ORG_CLUSTER_ID
   AND      (   lower(name)        like CONCAT('%', in_FILTER_STR, '%') 
             OR lower(cascadeCode) like CONCAT('%', in_FILTER_STR, '%') 
             OR lower(address)     like CONCAT('%', in_FILTER_STR, '%') 
             OR lower(city)        like CONCAT('%', in_FILTER_STR, '%') 
             OR lower(zipCode)     like CONCAT('%', in_FILTER_STR, '%') 
            )
   order by case when in_ORDER_BY = 'cascadeCode' and in_ORDER_DIR = 'asc'  then cascadeCode end asc 
          , case when in_ORDER_BY = 'cascadeCode' and in_ORDER_DIR = 'desc' then cascadeCode end desc
          , cascadeCode ASC
   limit in_PAGE_SIZE offset v_OFFSET;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getOrgClusterSitesPerf TO falcon;