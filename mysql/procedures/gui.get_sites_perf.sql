DROP PROCEDURE IF EXISTS gui.get_sites_perf;

DELIMITER $$
$$
CREATE DEFINER=`root`@`%` PROCEDURE `gui`.`get_sites_perf`(
   IN in_FILTER_ON   VARCHAR(50),
   IN in_FILTER_ID   INT,
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
 
   -- Get the total number of records
   SELECT   in_FILTER_ON group_type
          , l.parent_id
          , l.parent_name
          , in_FILTER_ID group_id
          , l.group_name
          , count(*) total_row_count
   FROM     locations.sites s
          , (select l5.l5_market_id     parent_id
                  , l5.l5_market_name   parent_name
			      , oc.org_cluster_name group_name
			 from   locations.org_clusters oc join locations.l5_markets l5 on l5.l5_market_id = oc.l5_market_id
			 where  in_FILTER_ON      = 'org_cluster_id' 
			 and    oc.org_cluster_id = in_FILTER_ID
			 union all
			 select r.region_id         parent_id
			      , r.region_name       parent_name
			      , m99.market99_name   group_name
			 from   locations.market99s m99 join locations.regions r on r.region_id = m99.region_id
			 where  in_FILTER_ON      = 'market99_id' 
			 and    m99.market99_id       = in_FILTER_ID
			 limit 1 -- not necessary but no harm just in case
            ) l
   WHERE    (in_FILTER_ON='org_cluster_id' AND s.org_cluster_id = in_FILTER_ID)
   OR       (in_FILTER_ON='market99_id'    AND s.market99_id    = in_FILTER_ID)
   GROUP BY in_FILTER_ON
          , in_FILTER_ID
          , l.parent_id
          , l.parent_name
          , l.group_name;
  
   select   s.site_id
          , s.cascade_code  
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