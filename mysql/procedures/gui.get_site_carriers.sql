DROP PROCEDURE IF EXISTS gui.get_site_carriers;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_site_carriers(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN
   select c.carrier_id 
        , c.bts_id 
        , c.channel_id 
        , ch.channel_number
        , c.carrier_number 
        , c.carrier_designation_id 
        , cd.carrier_designation_name 
        , c.carrier_type_id 
        , ct.carrier_type_name   
        , cd.sort_key 
        , c.equipment_status_id 
        , es.equipment_status_name
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
        , equipment.channels ch
   where  b.bts_id                  = c.bts_id 
   and    ct.carrier_type_id        = c.carrier_type_id 
   and    cd.carrier_designation_id = c.carrier_designation_id 
   and    es.equipment_status_id    = c.equipment_status_id 
   and    c.channel_id              = ch.channel_id
   and    b.cascade_code            = trim(upper(in_CASCADE_CODE));
END
$$
DELIMITER ;