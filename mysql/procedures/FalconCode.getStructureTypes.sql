DROP PROCEDURE IF EXISTS FalconCode.getStructureTypes;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getStructureTypes()
BEGIN
   SELECT   id structureTypeId
          , name structureTypeName
   FROM     FalconData.StructureType
   ORDER BY sortKey
          , name ;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getStructureTypes TO falcon;