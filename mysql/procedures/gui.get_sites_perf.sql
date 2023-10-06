DROP PROCEDURE IF EXISTS gui.get_sites_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_sites_perf(
   IN in_FILTER_ON   VARCHAR(50),
   IN in_FILTER_ID   INT,
   IN in_FILTER_STR  VARCHAR(50),
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
 
   -- Get the total number of records
   select   count(*) total_row_count
   from     locations.sites s
   where    (org_cluster_id = in_FILTER_ID AND in_FILTER_ON='org_cluster_id')
   OR       (l4_market_id   = in_FILTER_ID AND in_FILTER_ON='l4_market_id')
   OR       (l5_market_id   = in_FILTER_ID AND in_FILTER_ON='l5_market_id')
   OR       (region_id      = in_FILTER_ID AND in_FILTER_ON='region_id')
   OR       (market99_id    = in_FILTER_ID AND in_FILTER_ON='market99_id')
   OR       (mta_id         = in_FILTER_ID AND in_FILTER_ON='mta_id')
   OR       (bta_id         = in_FILTER_ID AND in_FILTER_ON='bta_id');
  
   select   s.site_id
          , s.cascade_code  
          , s.site_name
          , null setup_attempts
          , null equipment_blocks
          , null access_failures
          , null successful_calls
          , null primary_drops
          , null primary_erlangs
   from     locations.sites s
   where    (org_cluster_id = in_FILTER_ID AND in_FILTER_ON='org_cluster_id')
   OR       (l4_market_id   = in_FILTER_ID AND in_FILTER_ON='l4_market_id')
   OR       (l5_market_id   = in_FILTER_ID AND in_FILTER_ON='l5_market_id')
   OR       (region_id      = in_FILTER_ID AND in_FILTER_ON='region_id')
   OR       (market99_id    = in_FILTER_ID AND in_FILTER_ON='market99_id')
   OR       (mta_id         = in_FILTER_ID AND in_FILTER_ON='mta_id')
   OR       (bta_id         = in_FILTER_ID AND in_FILTER_ON='bta_id')
   order by case when in_ORDER_BY = 'cascade_code' and in_ORDER_DIR = 'asc'  then cascade_code end asc 
          , case when in_ORDER_BY = 'cascade_code' and in_ORDER_DIR = 'desc' then cascade_code end desc
          , s.cascade_code ASC
   limit in_PAGE_SIZE offset v_OFFSET;
END
$$
DELIMITER ;