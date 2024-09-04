DROP PROCEDURE IF EXISTS FalconCode.getSiteCarriers;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteCarriers(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
   select c.id 
        , c.btsId 
        , c.channelId 
        , ch.number channelNumber
        , c.carrierDesignationId 
        , cd.name carrierDesignationName 
        , c.carrierTypeId 
        , ct.name carrierTypeName   
        , cd.sortKey 
        , c.equipmentStatusId 
        , es.name equipmentStatusName
        , c.onAirDate 
        , TRIM(CONCAT(coalesce(uc.firstName,''), ' ', uc.lastName)) createdBy
        , c.createdAt 
        , TRIM(CONCAT(coalesce(uu.firstName,''), ' ', uu.lastName)) updateBy
        , c.updatedAt 
   from   FalconData.Carrier c
          join FalconData.Bts                b  on b.id  = c.btsId 
          join FalconData.CarrierType        ct on ct.id = c.carrierTypeId 
          join FalconData.CarrierDesignation cd on cd.id = c.carrierDesignationId 
          join FalconData.EquipmentStatus    es on es.id = c.equipmentStatusId 
          join FalconData.Channel            ch on ch.id = c.channelId
          join FalconData.Site               s  on s.id  = b.siteId 
          join FalconData.User               uc on uc.id = c.createdById 
          join FalconData.User               uu on uu.id = c.updatedById 
   where  s.cascadeCode            = trim(upper(in_CASCADE_CODE))
   order by c.btsId, cd.sortKey;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteCarriers TO falcon;