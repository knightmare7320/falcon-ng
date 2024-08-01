DROP PROCEDURE IF EXISTS gui.get_bscs_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_bscs_perf (
   IN in_SWITCH_ID           INT,
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

   SET in_SWITCH_ID = IFNULL(in_SWITCH_ID, -1);
   SET in_EQUIPMENT_VENDOR_ID = IFNULL(in_EQUIPMENT_VENDOR_ID, -1);
   SET in_FILTER_STR = lower(coalesce(trim(in_FILTER_STR), ''));  


   SELECT   a.switch_name
          , count(b.bsc_id) total_row_count
   FROM     locations.switches a 
            LEFT JOIN locations.bscs b 
                   ON a.switch_id = b.switch_id
   WHERE    (in_SWITCH_ID = -1 OR a.switch_id = in_SWITCH_ID)
   AND      lower(b.org_cluster_name) like CONCAT('%', in_FILTER_STR, '%')
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR b.equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID)
   GROUP BY a.switch_name;  
   
   SELECT   b.switch_id
          , b.bsc_id
          , b.bsc_name 
          , v.equipment_vendor_id
          , v.equipment_vendor_name
          , null setup_attempts
          , null primary_blocks
          , null access_failures
          , null successul_calls
          , null primary_drops
          , null primary_erlangs
   FROM     equipment.bscs b
          , equipment.equipment_vendors v
   WHERE    b.equipment_vendor_id = v.equipment_vendor_id
   AND      (in_SWITCH_ID = -1           OR b.switch_id            = in_SWITCH_ID)
   AND      (in_EQUIPMENT_VENDOR_ID = -1 OR v.equipment_vendor_id  = in_EQUIPMENT_VENDOR_ID)
   AND      lower(b.bsc_name) like CONCAT('%', in_FILTER_STR, '%')

   ORDER BY case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'asc'  then bsc_name end asc 
          , case when in_ORDER_BY = 'name' and in_ORDER_DIR = 'desc' then bsc_name end desc
          , bsc_name ASC
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END 
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE gui.get_bscs_perf TO falcon;