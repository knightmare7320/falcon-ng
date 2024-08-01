DROP PROCEDURE IF EXISTS gui.get_bscs;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_bscs(
   IN in_SWITCH_ID           INT,
   IN in_EQUIPMENT_VENDOR_ID INT
)
BEGIN
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);
   SET in_SWITCH_ID = IFNULL(in_SWITCH_ID, -1);

   select   b.switch_id
          , b.bsc_id
          , b.bsc_name 
          , v.equipment_vendor_id
          , v.equipment_vendor_name
   from     equipment.bscs b
          , equipment.equipment_vendors v
   WHERE    b.equipment_vendor_id = v.equipment_vendor_id
   AND      (in_SWITCH_ID           = -1 OR b.switch_id            = in_SWITCH_ID)
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID)
   order by bsc_name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_bscs TO falcon;