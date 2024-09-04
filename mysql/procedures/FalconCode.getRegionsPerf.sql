DROP PROCEDURE IF EXISTS FalconCode.getRegionsPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getRegionsPerf (
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


   SELECT   count(*) totalRowCount
   FROM     FalconData.Region
   WHERE    lower(name) like CONCAT('%', in_FILTER_STR, '%');
  
   
   SELECT   id
          , name 
          , null setupAttempts
          , null primaryBlocks
          , null accessFailures
          , null successulCalls
          , null primaryDrops
          , null primaryErlangs
   FROM     FalconData.Region 
   WHERE    lower(name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then name end desc
          , name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getRegionsPerf TO falcon;