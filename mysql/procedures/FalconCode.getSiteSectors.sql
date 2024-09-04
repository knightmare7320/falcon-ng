DROP PROCEDURE IF EXISTS FalconCode.getSiteSectors;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteSectors(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
   select se.id sectorId
        , se.number 
        , se.azimuth 
        , se.heightAgl 
        , se.mechanicalTilt 
        , se.antennaModelId 
        , a.equipmentVendorId
        , ev.name equipmentVendorName
        , a.name antennaName 
        , a.horizontalBw
        , a.verticalBw 
        , a.gainDbi 
        , a.frontToBackRatio 
        , a.electricalTilt 
        , se.sectorCoverageTypeId 
        , sct.name sectorCoverageTypeName 
        , TRIM(CONCAT(coalesce(uc.firstName,''), ' ', uc.lastName)) createdBy
        , se.createdAt 
        , TRIM(CONCAT(coalesce(uu.firstName,''), ' ', uu.lastName)) updateBy
        , se.updatedAt 
   from   FalconData.Sector se 
          join FalconData.AntennaModel a         on a.id   = se.antennaModelId 
          join FalconData.EquipmentVendor ev     on ev.id  = a.equipmentVendorId
          join FalconData.SectorCoverageType sct on sct.id = se.sectorCoverageTypeId 
          join FalconData.Site s                 on s.id   = se.siteId 
          join FalconData.User uc                on uc.id  = se.createdById 
          join FalconData.User uu                on uu.id  = se.updatedById 
   where  s.cascadeCode = upper(trim(in_CASCADE_CODE))
   order by se.number;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteSectors TO falcon;