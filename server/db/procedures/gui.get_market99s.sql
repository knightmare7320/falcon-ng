CREATE PROCEDURE gui.get_market99s(
   IN in_REGION_ID INT
)
BEGIN
   SET in_REGION_ID = IFNULL(in_REGION_ID, -1);

   select   market99_id
          , market99_name 
   from     locations.market99s  
   where    in_REGION_ID = -1 OR region_id = in_REGION_ID
   order by market99_name;
END