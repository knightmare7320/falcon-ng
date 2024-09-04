DROP PROCEDURE IF EXISTS FalconCode.getMscs;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getMscs(
   IN in_EQUIPMENT_VENDOR_ID INT
)
BEGIN
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);

   select   sw.id   mscId
          , sw.name mscName
          , sw.equipmentVendorId
          , v.name equipmentVendorName
   from     FalconData.Msc sw
          , FalconData.EquipmentVendor v
   WHERE    sw.equipmentVendorId = v.id
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.id  = in_EQUIPMENT_VENDOR_ID)
   order by name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getMscs TO falcon;