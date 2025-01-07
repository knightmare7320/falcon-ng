DROP PROCEDURE IF EXISTS FalconCode.getRepairPriorities;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getRepairPriorities()
BEGIN
   SELECT   id   repairPriorityId
          , name repairPriorityName
   FROM     FalconData.RepairPriority
   ORDER BY sortKey
          , name ;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getRepairPriorities TO falcon;