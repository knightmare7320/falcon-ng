export type Site = {
  site_id: number,
  cascade_code: string,
  site_name: string,
  site_type_id: number,
  site_type_name: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip_code: string,
  county: string,
  latitude: number,
  longitude: number, 
  elevation_feet: number, 
  structure_type_id: number,
  structure_type_name: string,
  repair_priority_id: number,
  repair_priority_name: string,
  timezone_id: number,
  timezone_name: string,
  region_id: number,
  region_name: string,
  market99_id: number,
  market99_name: string,
  l4_market_id: number,
  l4_market_name: string,
  l5_market_id: number,
  l5_market_name: string,
  org_cluster_id: number,
  org_cluster_name: string,
  mta_id: number,
  mta_name: string,
  bta_id: number,
  bta_name: string,
  created_by_name: string,
  create_date: string,
  modified_by_name: string,
  modified_date: string,
}

export type Bts = {
  bts_id: number,
  switch_id: number,
  switch_name: string, 
  clli_code: string, 
  bsc_id: number,
  bsc_name: string, 
  bts_number: string,
  bts_number_bsc: string,
  bts_type_id: number, 
  bts_type_name: string, 
  equipment_status_id: number,
  equipment_status_name: string, 
  equipment_vendor_id: number,
  equipment_vendor_name: string, 
  equipment_model_id: number,
  equipment_model_name: string, 
  on_air_date: string,
  created_by_name: string,
  create_date: string,
  modified_by_name: string,
  modified_date: string,
}

export type Sector = {
  sector_id: number,
  sector_number: number, 
  azimuth: number, 
  height_agl: number, 
  mechanical_tilt: number, 
  antenna_id: number, 
  equipment_vendor_id: number,
  antenna_vendor_name: string, 
  antenna_name: string,  
  horizontal_bw: number,
  vertical_bw: number, 
  gain_dbi: number, 
  front_to_back_ratio: number, 
  electrical_tilt: number, 
  sector_coverage_type_id: number, 
  sector_coverage_type_name: string,  
  radius_meters: number, 
  created_by_name: string,  
  create_date: string,  
  modified_by_name: string,  
  modified_date: string,  
}

export type Carrier = {   
  carrier_id: number, 
  bts_id: number, 
  channel_id: number, 
  carrier_number: number, 
  carrier_designation_id: number, 
  carrier_designation_name: string,  
  carrier_type_id: number, 
  carrier_type_name: string,    
  sort_key: number,  
  equipment_status_id: number, 
  equipment_status_name: string, 
  on_air_date: string,  
  created_by_name: string,  
  create_date: string,  
  modified_by_name: string,  
  modified_date: string,  
}