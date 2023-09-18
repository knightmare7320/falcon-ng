CREATE DEFINER=`root`@`%` PROCEDURE `gui`.`get_site`(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
   select s.site_id
        , s.cascade_code 
        , s.site_name 
        , s.site_type_id
        , st.site_type_name 
        , s.address1 
        , s.address2 
        , s.city 
        , s.state 
        , s.zip_code 
        , s.county 
        , s.latitude 
        , s.longitude 
        , s.elevation_feet 
        , s.structure_type_id  --
        , str.structure_type_name 
        , s.repair_priority_id --
        , rp.repair_priority_name 
        , s.timezone_id  --
        , t.timezone_name 
        , s.region_id  --
        , r.region_name 
        , s.market99_id  --
        , ms.market99_name 
        , s.l4_market_id --
        , l4.l4_market_name 
        , s.l5_market_id --
        , l5.l5_market_name 
        , s.org_cluster_id --
        , oc.org_cluster_name 
        , s.mta_id --
        , m.mta_name 
        , s.bta_id --
        , b.bta_name 
        , s.created_by_name
        , s.create_date 
        , s.modified_by_name
        , s.modified_date
   from   locations.sites s
        , locations.site_types st 
        , locations.structure_types str
        , locations.repair_priorities rp 
        , locations.timezones t 
        , locations.regions r 
        , locations.market99s ms 
        , locations.l4_markets l4 
        , locations.l5_markets l5
        , locations.org_clusters oc 
        , locations.mtas m 
        , locations.btas b
   where  st.site_type_id       = s.site_type_id 
   and    str.structure_type_id = s.structure_type_id 
   and    rp.repair_priority_id = s.repair_priority_id 
   and    t.timezone_id         = s.timezone_id 
   and    r.region_id           = s.region_id 
   and    ms.market99_id        = s.market99_id 
   and    l4.l4_market_id       = s.l4_market_id 
   and    l5.l5_market_id       = s.l5_market_id 
   and    oc.org_cluster_id     = s.org_cluster_id 
   and    m.mta_id              = s.mta_id 
   and    b.bta_id              = s.bta_id 
   and    s.cascade_code        = upper(trim(in_CASCADE_CODE));
END