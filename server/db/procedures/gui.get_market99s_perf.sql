DROP PROCEDURE IF EXISTS gui.get_market99s_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_market99s_perf (
   IN in_REGION_ID INT,
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


   SELECT   a.region_name
          , count(b.market99_id) total_records
   FROM     locations.regions a 
            LEFT JOIN locations.market99s b 
                   ON a.region_id = b.region_id
   WHERE    a.REGION_ID = in_REGION_ID
   AND      lower(b.market99_name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY a.region_name;
   
   SELECT   market99_id
          , market99_name 
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     locations.market99s
   WHERE    region_id = in_REGION_ID
   AND      lower(market99_name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then market99_name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then market99_name end desc
          , market99_name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;
