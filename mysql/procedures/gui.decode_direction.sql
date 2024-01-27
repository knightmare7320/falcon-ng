DROP PROCEDURE IF EXISTS gui.decode_direction;

DELIMITER $$
$$
CREATE FUNCTION gui.decode_direction(
   azimuth DOUBLE
)
RETURNS varchar(2)
no sql
deterministic
BEGIN
   
   if azimuth <22.5 or azimuth > 337.5 THEN 
      return 'N';
   elseif azimuth >=22.5 and azimuth < 67.5 THEN
      return 'NE';
   elseif azimuth >= 67.5 and azimuth < 112.5 then
      return 'E';
   elseif azimuth >= 112.5 and azimuth < 157.5 then
      return 'SE';
   elseif azimuth >= 157.5 and azimuth < 202.5 then
      return 'S';
   elseif azimuth >= 202.5 and azimuth < 247.5 then
      return 'SW';
   elseif azimuth >= 247.5 and azimuth < 292.5 then
      return 'W';
   elseif azimuth >= 292.5 and azimuth < 337.5 then
      return 'NW';
   end if;

   return '';
END
$$

DELIMITER ;