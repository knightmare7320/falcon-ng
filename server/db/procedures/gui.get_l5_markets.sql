DROP PROCEDURE IF EXISTS gui.get_switches;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_switches(
   IN in_EQUIPMENT_VENDOR_ID INT
)
BEGIN
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);

   select   sw.switch_id
          , sw.switch_name 
          , v.equipment_vendor_id
          , v.equipment_vendor_name
   from     equipment.switches sw
          , equipment.equipment_vendors v
   WHERE    sw.equipment_vendor_id = v.equipment_vendor_id
   AND      in_EQUIPMENT_VENDOR_ID = -1 OR v.equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID
   order by switch_name;
END
$$
DELIMITER ;