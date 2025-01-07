DROP PROCEDURE IF EXISTS FalconCode.getL5MarketsPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getL5MarketsPerf (
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


   SELECT   r.id         regionId
          , r.name       regionName
          , l4.id        l4MarketId
          , l4.name      l4MarketName
          , count(l5.id) totalRowCount
   FROM     FalconData.Region r 
            join      FalconData.L4Market l4 ON l4.regionId   = r.id
            LEFT JOIN FalconData.L5Market l5 ON l5.l4MarketId = l4.id
   WHERE    l4.id = in_L4_MARKET_ID
   AND      lower(l5.name) like CONCAT('%', in_FILTER_STR, '%')
   GROUP BY r.id
          , r.name
          , l4.id
          , l4.name;
     
   SELECT   id   l5MarketId
          , name l5MarketName
          , null setupAttempts
          , null primaryBlocks
          , null accessFailures
          , null successulCalls
          , null primaryDrops
          , null primaryErlangs
   FROM     FalconData.L5Market 
   WHERE    l4MarketId = in_L4_MARKET_ID
   AND      lower(name) like CONCAT('%', in_FILTER_STR, '%')
   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then name end desc
          , name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getL5MarketsPerf TO falcon;