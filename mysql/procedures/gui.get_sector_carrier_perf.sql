DROP PROCEDURE IF EXISTS gui.get_sector_carrier_perf;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_sector_carrier_perf(
  in in_DATE_VALUE date,
  in in_BTS_ID int,
  in in_SECTOR_ID int,
  in in_CARRIER_ID int
)
BEGIN
  declare v_multiplier int;
  
  declare v_setup_attempts int;
  declare v_equipment_blocks int;
  declare v_access_failures int;
  declare v_successful_calls int;
  declare v_primary_drops int;
  
  
  case dayofweek(in_DATE_VALUE)
  WHEN 1 then set v_multiplier = 100;
  WHEN 2 then set v_multiplier = 200;
  WHEN 3 then set v_multiplier = 300;
  WHEN 4 then set v_multiplier = 400;
  WHEN 5 then set v_multiplier = 500;
  WHEN 6 then set v_multiplier = 600;
  WHEN 7 then set v_multiplier = 250;
  end case;
  
  
  set v_setup_attempts = rand() * v_multiplier;
  set v_equipment_blocks = round(power(rand(), 20) * v_setup_attempts);
  set v_access_failures = round(power(rand(), 15) * (v_setup_attempts - v_equipment_blocks));
  set v_successful_calls = v_setup_attempts - v_equipment_blocks - v_access_failures;
  set v_primary_drops = round(power(rand(), 10) * v_successful_calls);
  
  select in_BTS_ID as bts_id,
         in_SECTOR_ID as sector_id,
         in_CARRIER_ID as carrier_id,
         v_setup_attempts as tot_setup_attempts,
         v_equipment_blocks as tot_equipment_blocks,
         v_access_failures as tot_access_failures,
         v_successful_calls as tot_successful_calls,
         v_primary_drops as tot_primary_drops;
  
END
$$
DELIMITER ;