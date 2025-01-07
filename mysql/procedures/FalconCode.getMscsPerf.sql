DROP PROCEDURE IF EXISTS FalconCode.getMscsPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getMscsPerf (
   IN in_EQUIPMENT_VENDOR_ID INT,
   IN in_FILTER_STR  VARCHAR(50),
   IN in_ORDER_BY    VARCHAR(50),
   IN in_ORDER_DIR   VARCHAR(10),
   IN in_PAGE_NUMBER INT,
   IN in_PAGE_SIZE   INT
)
BEGIN  
   DECLARE v_OFFSET INT;

   SET in_PAGE_NUMBER = IFNULL(in_PAGE_NUMBER, 1);
   SET in_PAGE_SIZE   = IFNULL(in_PAGE_SIZE, 10);
  
   -- Calculate the offset
   SET v_OFFSET = (in_PAGE_NUMBER - 1) * in_PAGE_SIZE;

   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);
   SET in_FILTER_STR = lower(coalesce(trim(in_FILTER_STR), ''));  


   SELECT   count(*) totalRowCount
   FROM     FalconData.Msc
   WHERE    (in_EQUIPMENT_VENDOR_ID = -1 OR equipmentVendorId  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(name) like CONCAT('%', in_FILTER_STR, '%');
  
   
   SELECT   sw.id   mscId
          , sw.name mscName
          , v.id    equipmentVendorId
          , v.name  equipmentVendorName
          , null    setupAttempts
          , null    primaryBlocks
          , null    accessFailures
          , null    successulCalls
          , null    primaryDrops
          , null    primaryErlangs
   FROM     FalconData.Msc sw
          , FalconData.EquipmentVendor v
   WHERE    sw.equipmentVendorId = v.id
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.id  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(sw.name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then sw.name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then sw.name end desc
          , sw.name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getMscsPerf TO falcon;