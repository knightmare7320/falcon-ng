DROP PROCEDURE IF EXISTS FalconCode.getQuickSearch;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getQuickSearch (
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


   SELECT   count(distinct cascadeCode) totalRowCount 
   FROM     FalconData.Site
   WHERE    cascadeCode                    LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(name)                    LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(address)                 LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(concat(city,', ',state)) LIKE concat('%', in_SEARCH_STR, '%')
   OR       zipCode                        LIKE concat(     in_SEARCH_STR, '%');


   SELECT   cascadeCode
          , name
          , address
          , city
          , state 
   FROM     FalconData.Site
   WHERE    cascadeCode                    LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(name)                    LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(address)                 LIKE concat('%', in_SEARCH_STR, '%')
   OR       LOWER(concat(city,', ',state)) LIKE concat('%', in_SEARCH_STR, '%')
   OR       zipCode                        LIKE concat(     in_SEARCH_STR, '%')   
   ORDER BY cascadeCode
   LIMIT    in_PAGE_SIZE offset v_OFFSET;

END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getQuickSearch TO falcon;