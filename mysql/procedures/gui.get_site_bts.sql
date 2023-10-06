DROP PROCEDURE IF EXISTS gui.get_site_bts;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_site_bts(
   IN in_CASCADE_CODE VARCHAR(20)
)
BEGIN   
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
   and    b.cascade_code         = upper(trim(in_CASCADE_CODE));
END
$$
DELIMITER ;