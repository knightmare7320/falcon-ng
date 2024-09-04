DROP PROCEDURE IF EXISTS FalconCode.getBscsPerf;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getBscsPerf (
   IN in_MSC_ID           INT,
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

   SET in_MSC_ID = IFNULL(in_MSC_ID, -1);
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);
   SET in_FILTER_STR = lower(coalesce(trim(in_FILTER_STR), ''));  


   SELECT   a.id        mscId
          , a.name      mscName
          , count(b.id) totalRowCount
   FROM     FalconData.Msc a 
            LEFT JOIN FalconData.Bsc b ON a.id = b.mscId
   WHERE    (in_MSC_ID = -1 OR a.id = in_MSC_ID)
   AND      lower(b.name) like CONCAT('%', in_FILTER_STR, '%')
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR b.equipmentVendorId  = in_EQUIPMENT_VENDOR_ID)
   GROUP BY a.name;  
   
   SELECT   b.id   bscId
          , b.name bscName
          , v.id   equipmentVendorId
          , v.name equipmentVendorName
          , null   setupAttempts
          , null   primaryBlocks
          , null   accessFailures
          , null   successulCalls
          , null   primaryDrops
          , null   primaryErlangs
   FROM     FalconData.Bsc b
          , FalconData.EquipmentVendor v
   WHERE    b.equipmentVendorId = v.id
   AND      (in_MSC_ID = -1              OR b.mscId  = in_MSC_ID)
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.id  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(b.name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then b.name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then b.name end desc
          , b.name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getBscsPerf TO falcon;