DROP PROCEDURE IF EXISTS gui.get_l4_markets;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_l4_markets(
   IN in_REGION_ID INT
)
BEGIN
   SET in_REGION_ID = IFNULL(in_REGION_ID, -1);

   select   l4_market_id
          , l4_market_name 
   from     locations.l4_markets 
   where    in_REGION_ID = -1 OR region_id = in_REGION_ID
   order by l4_market_name;
END
$$
DELIMITER ;