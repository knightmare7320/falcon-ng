DROP PROCEDURE IF EXISTS gui.get_switches_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_switches_perf (
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


   SELECT   count(*) total_row_count
   FROM     equipment.switches
   WHERE    (in_EQUIPMENT_VENDOR_ID = -1 OR equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(switch_name) like CONCAT('%', in_FILTER_STR, '%');
  
   
   SELECT   sw.switch_id
          , sw.switch_name 
          , v.equipment_vendor_id
          , v.equipment_vendor_name
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     equipment.switches sw
          , equipment.equipment_vendors v
   WHERE    sw.equipment_vendor_id = v.equipment_vendor_id
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(sw.switch_name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then switch_name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then switch_name end desc
          , switch_name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;
