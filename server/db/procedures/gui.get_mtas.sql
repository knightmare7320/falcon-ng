CREATE PROCEDURE gui.get_mtas()
BEGIN
   select   mta_id
          , mta_name 
   from     locations.mtas
   order by mta_name;
END