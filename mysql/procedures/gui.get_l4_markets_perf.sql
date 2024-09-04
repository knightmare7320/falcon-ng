DROP PROCEDURE IF EXISTS FalconCode.getL4MarketsPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getL4MarketsPerf (
   IN in_REGION_ID   INT,
   IN in_FILTER_STR  VARCHAR(50),
   IN in_ORDER_BY    VARCHAR(50),
   IN in_ORDER_DIR   VARCHAR(10),
   IN in_PAGE_NUMBER INT,
   IN in_PAGE_SIZE   INT
)
BEGIN  
   DECLARE v_OFFSET INT;

   SET in_PAGE_NUMBER = IFNULL(in_PAGE_NUMBER, 1);
   SET in_PAGE_SIZE   = IFNULL(in_PAGE_SIZE, 10);
  
   -- Calculate the offset
   SET v_OFFSET = (in_PAGE_NUMBER - 1) * in_PAGE_SIZE;

   SET in_FILTER_STR = lower(coalesce(trim(in_FILTER_STR), ''));

   
   SELECT   a.id   regionId
          , a.name regionName
          , count(b.id) totalRowCount
   FROM     FalconData.Region a 
            LEFT JOIN FalconData.L4Market b ON a.id = b.regionId
   WHERE    a.id = in_REGION_ID
   AND      lower(b.name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY a.id
          , a.name;
     
   SELECT   id
          , name 
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     FalconData.L4Market 
   WHERE    regionId = in_REGION_ID
   AND      lower(name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then name end desc
          , name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getL4MarketsPerf TO falcon;