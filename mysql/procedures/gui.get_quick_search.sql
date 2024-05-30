DROP PROCEDURE IF EXISTS gui.get_quick_search;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_quick_search (
   IN in_SEARCH_STR  VARCHAR(50),
   IN in_PAGE_NUMBER INT,
   IN in_PAGE_SIZE   INT
)
BEGIN  
   DECLARE v_OFFSET INT;
   SET in_PAGE_NUMBER = IFNULL(in_PAGE_NUMBER, 1);
   SET in_PAGE_SIZE   = IFNULL(in_PAGE_SIZE, 10);
   SET v_OFFSET = (in_PAGE_NUMBER - 1) * in_PAGE_SIZE;

   SET in_SEARCH_STR = lower(coalesce(trim(in_SEARCH_STR), ''));  

   SELECT   cascade_code
          , site_name
          , address1
          , city
          , state 
   FROM     locations.sites
   WHERE    cascade_code                   LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(site_name)               LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(address1)                LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(concat(city,', ',state)) LIKE concat('%', in_SEARCH_STR, '%')
   OR       zip_code                       LIKE concat(     in_SEARCH_STR, '%')
   
   ORDER BY cascade_code
   LIMIT    in_PAGE_SIZE offset v_OFFSET;
END
$$
DELIMITER ;