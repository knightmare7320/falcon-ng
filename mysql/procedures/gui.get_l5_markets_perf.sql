DROP PROCEDURE IF EXISTS gui.get_l5_markets_perf;

DELIMITER $$
$$
CREATE DEFINER=`root`@`%` PROCEDURE `gui`.`get_l5_markets_perf`(
   IN in_L4_MARKET_ID INT,
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

   SET in_FILTER_STR = lower(coalesce(trim(in_FILTER_STR), ''));


   SELECT   a.region_id
          , a.l4_market_name
          , count(b.l5_market_id) total_record_count
   FROM     locations.l4_markets a 
            LEFT JOIN locations.l5_markets b 
                   ON a.l4_market_id = b.l4_market_id
   WHERE    a.l4_market_id = in_L4_MARKET_ID
   AND      lower(b.l5_market_name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY a.region_id
          , a.l4_market_name;
     
   SELECT   l5_market_id
          , l5_market_name 
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     locations.l5_markets 
   WHERE    l4_market_id = in_L4_MARKET_ID
   AND      lower(l5_market_name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then l5_market_name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then l5_market_name end desc
          , l5_market_name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END
$$
DELIMITER ;
