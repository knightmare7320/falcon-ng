DROP PROCEDURE IF EXISTS FalconCode.getSite;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getSite(
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
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getSite TO falcon;