DROP PROCEDURE IF EXISTS FalconCode.getBscs;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getBscs(
   IN in_MSC_ID              INT,
   IN in_EQUIPMENT_VENDOR_ID INT
)
BEGIN
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);
   SET in_MSC_ID = IFNULL(in_MSC_ID, -1);

   select   b.mscId
          , b.id
          , b.name 
          , b.equipmentVendorId
          , v.name equipmentVendorName
   from     FalconData.Bsc b
          , FalconData.EquipmentVendor v
   WHERE    b.equipmentVendorId = v.id
   AND      (in_MSC_ID              = -1 OR b.mscId              = in_MSC_ID)
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR b.equipmentVendorId  = in_EQUIPMENT_VENDOR_ID)
   order by name;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getBscs TO falcon;