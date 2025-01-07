DROP PROCEDURE IF EXISTS FalconCode.getSiteBts;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteBts(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN   
   select b.id btsId
        , bs.mscId
        , ms.name mscName 
        , ms.clliCode 
        , b.bscId
        , bs.name bscName 
        , b.number btsNumber
        , b.equipmentStatusId
        , es.name equipmentStatusName 
        , em.equipmentVendorId
        , ev.name equipmentVendorName 
        , b.equipmentModelId
        , em.name equipmentModelName 
        , b.onAirDate
        , TRIM(CONCAT(coalesce(uc.firstName,''), ' ', uc.lastName)) createdBy
        , b.createDate 
        , TRIM(CONCAT(coalesce(uu.firstName,''), ' ', uu.lastName)) modifiedBy
        , b.modifiedDate 
   from   FalconData.Bts b
          join FalconData.Bsc bs             on bs.id = b.bscId 
          join FalconData.Msc ms             on ms.id = bs.mscId 
          join FalconData.EquipmentStatus es on es.id = b.equipmentStatusId 
          join FalconData.EquipmentModel em  on em.id = b.equipmentModelId 
          join FalconData.EquipmentVendor ev on ev.id = em.equipmentVendorId 
          join FalconData.Site s             on s.id  = b.siteId 
          join FalconData.User uc            on uc.id = b.createdById 
          join FalconData.User uu            on uu.id = b.modifiedById 
   where   s.cascadeCode         = upper(trim(in_CASCADE_CODE));
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteBts TO falcon;