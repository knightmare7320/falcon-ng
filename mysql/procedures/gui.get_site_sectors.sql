DROP PROCEDURE IF EXISTS gui.get_site_sectors;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_site_sectors(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
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
   and    se.cascade_code             = upper(trim(in_CASCADE_CODE));
END
$$
DELIMITER ;