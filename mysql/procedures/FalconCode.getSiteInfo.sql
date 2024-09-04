DROP PROCEDURE IF EXISTS FalconCode.getSiteInfo;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSiteInfo(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
   
   select s.id siteId
        , s.cascadeCode 
        , s.name siteName
        , s.siteTypeId
        , st.name            siteTypeName 
        , s.address
        , s.city 
        , s.state 
        , s.zipCode 
        , s.latitude 
        , s.longitude 
        , s.elevation 
        , s.structureTypeId
        , str.name           structureTypeName 
        , s.repairPriorityId
        , rp.name            repairPriorityName 
        , s.timezoneId
        , t.name             timezoneName 
        , l4.regionId
        , r.name             regionName  
        , l5.l4MarketId
        , l4.name            l4MarketName 
        , oc.l5MarketId
        , l5.name            l5MarketName 
        , s.orgClusterId
        , oc.name            orgClusterName
        , s.createdById 
        , TRIM(CONCAT(coalesce(uc.firstName,''), ' ', uc.lastName)) createdBy
        , s.createdAt 
        , TRIM(CONCAT(coalesce(uu.firstName,''), ' ', uu.lastName)) updateBy
        , s.updatedAt
   from   FalconData.Site s
        , FalconData.SiteType st 
        , FalconData.StructureType str
        , FalconData.RepairPriority rp 
        , FalconData.Timezone t 
        , FalconData.Region r  
        , FalconData.L4Market l4 
        , FalconData.L5Market l5
        , FalconData.OrgCluster oc 
        , FalconData.User uc
        , FalconData.User uu
   where  st.id         = s.siteTypeId 
   and    str.id        = s.structureTypeId 
   and    rp.id         = s.repairPriorityId 
   and    t.id          = s.timezoneId 
   and    r.id          = l4.regionId  
   and    l4.id         = l5.l4MarketId 
   and    l5.id         = oc.l5MarketId 
   and    oc.id         = s.orgClusterId
   and    uc.id         = s.createdById
   and    uu.id         = s.updatedById
   and    s.cascadeCode = upper(trim(in_CASCADE_CODE));
   
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
   
   select se.id
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

GRANT EXECUTE ON PROCEDURE FalconCode.getSiteInfo TO falcon;