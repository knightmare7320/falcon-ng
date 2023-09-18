CREATE PROCEDURE gui.get_l5_markets(
   IN in_L4_MARKET_ID INT
)
BEGIN
   SET in_L4_MARKET_ID = IFNULL(in_L4_MARKET_ID, -1);

   select   l5_market_id
          , l5_market_name 
   from     locations.l5_markets 
   where    in_L4_MARKET_ID = -1 OR l4_market_id = in_L4_MARKET_ID
   order by l5_market_name;
END