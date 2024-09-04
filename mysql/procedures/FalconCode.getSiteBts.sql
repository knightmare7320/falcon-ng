DROP PROCEDURE IF EXISTS FalconCode.getSiteBts;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteBts(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN   
   select b.id
        , bs.mscId
        , ms.name switchName 
        , ms.clliCode 
        , b.bscId
        , bs.name bscName 
        , b.number 
        , b.equipmentStatusId
        , es.name equipmentStatusName 
        , em.equipmentVendorId
        , ev.name equipmentVendorName 
        , b.equipmentModelId
        , em.name equipmentModelName 
        , b.onAirDate
        , TRIM(CONCAT(coalesce(uc.firstName,''), ' ', uc.lastName)) createdBy
        , b.createdAt 
        , TRIM(CONCAT(coalesce(uu.firstName,''), ' ', uu.lastName)) updateBy
        , b.updatedAt 
   from   FalconData.Bts b
          join FalconData.Bsc bs             on bs.id = b.bscId 
          join FalconData.Msc ms             on ms.id = bs.mscId 
          join FalconData.EquipmentStatus es on es.id = b.equipmentStatusId 
          join FalconData.EquipmentModel em  on em.id = b.equipmentModelId 
          join FalconData.EquipmentVendor ev on ev.id = em.equipmentVendorId 
          join FalconData.Site s             on s.id  = b.siteId 
          join FalconData.User uc            on uc.id = b.createdById 
          join FalconData.User uu            on uu.id = b.updatedById 
   where   s.cascadeCode         = upper(trim(in_CASCADE_CODE));
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteBts TO falcon;