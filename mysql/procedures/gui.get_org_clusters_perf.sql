DROP PROCEDURE IF EXISTS gui.get_org_clusters_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_org_clusters_perf (
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


   SELECT   a.l4_market_id
          , a.l5_market_name
          , count(b.org_cluster_id) total_row_count
   FROM     locations.l5_markets a 
            LEFT JOIN locations.org_clusters b 
                   ON a.l5_market_id = b.l5_market_id
   WHERE    a.l5_market_id = in_L5_MARKET_ID
   AND      lower(b.org_cluster_name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY a.l4_market_id
          , a.l5_market_name;
   
   SELECT   org_cluster_id
          , org_cluster_name 
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     locations.org_clusters 
   WHERE    l5_market_id = in_L5_MARKET_ID
   AND      lower(org_cluster_name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then org_cluster_name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then org_cluster_name end desc
          , org_cluster_name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;
