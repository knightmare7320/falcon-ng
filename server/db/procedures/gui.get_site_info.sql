CREATE PROCEDURE gui.get_site_info(
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
   and    s.cascade_code        = in_CASCADE_CODE;
   
   select b.bts_id
        , b.switch_id
        , sw.switch_name 
        , sw.clli_code 
        , b.bsc_id
        , bs.bsc_name 
        , b.bts_number
        , b.bts_number_bsc
        , b.bts_type_id 
        , bt.bts_type_name 
        , b.equipment_status_id
        , es.equipment_status_name 
        , b.equipment_vendor_id
        , ev.equipment_vendor_name 
        , b.equipment_model_id
        , em.equipment_model_name 
        , b.on_air_date
        , b.created_by_name
        , b.create_date
        , b.modified_by_name
        , b.modified_date
   from   equipment.bts b
        , equipment.switches sw 
        , equipment.bscs bs
        , equipment.bts_types bt
        , equipment.equipment_statuses es 
        , equipment.equipment_vendors ev 
        , equipment.equipment_models em 
   where  sw.switch_id           = b.switch_id 
   and    bs.bsc_id              = b.bsc_id 
   and    bt.bts_type_id         = b.bts_type_id 
   and    es.equipment_status_id = b.equipment_status_id 
   and    ev.equipment_vendor_id = b.equipment_vendor_id 
   and    em.equipment_model_id  = b.equipment_model_id 
   and    b.cascade_code         = in_CASCADE_CODE;
   
   select se.sector_id
        , se.sector_number 
        , se.azimuth 
        , se.height_agl 
        , se.mechanical_tilt 
        , se.antenna_id 
        , ev.equipment_vendor_name antenna_vendor_name
        , ev.equipment_vendor_name antenna_vendor_name
        , a.antenna_name 
        , a.horizontal_bw
        , a.vertical_bw 
        , a.gain_dbi 
        , a.front_to_back_ratio 
        , a.electrical_tilt 
        , se.sector_coverage_type_id 
        , sct.sector_coverage_type_name 
        , se.radius_meters 
        , se.created_by_name 
        , se.create_date 
        , se.modified_by_name 
        , se.modified_date 
   from   equipment.sectors se 
        , equipment.antennas a 
        , equipment.equipment_vendors ev
        , equipment.sector_coverage_types sct 
   where  sct.sector_coverage_type_id = se.sector_coverage_type_id 
   and    a.antenna_id                = se.antenna_id 
   and    ev.equipment_vendor_id      = a.equipment_vendor_id
   and    se.cascade_code             = in_CASCADE_CODE;
   
   select c.carrier_id 
        , c.bts_id 
        , c.channel_id 
        , c.carrier_number 
        , c.carrier_designation_id 
        , cd.carrier_designation_name 
        , c.carrier_type_id 
        , ct.carrier_type_name   
        , c.equipment_status_id 
        , es.equipment_status_name carrier_status_name
        , c.on_air_date 
        , c.created_by_name 
        , c.create_date 
        , c.modified_by_name 
        , c.modified_date 
   from   equipment.carriers c
        , equipment.bts b 
        , equipment.carrier_types ct 
        , equipment.carrier_designations cd 
        , equipment.equipment_statuses es 
   where  b.bts_id                  = c.bts_id 
   and    ct.carrier_type_id        = c.carrier_type_id 
   and    cd.carrier_designation_id = c.carrier_designation_id 
   and    es.equipment_status_id    = c.equipment_status_id 
   and    b.cascade_code            = in_CASCADE_CODE;

END