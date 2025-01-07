DROP PROCEDURE IF EXISTS FalconCode.getL5Markets;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getL5Markets(
   IN in_L4_MARKET_ID INT
)
BEGIN
   SET in_L4_MARKET_ID = IFNULL(in_L4_MARKET_ID, -1);
   
   select   id         l5MarketId
          , name       l5MarketName
          , l4MarketId
   from     FalconData.L5Market 
   where    in_L4_MARKET_ID = -1 OR l4MarketId = in_L4_MARKET_ID
   order by name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getL5Markets TO falcon;