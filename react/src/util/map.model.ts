export type GeoSite = {
  cascade_code:string,
  latitude:number,
  longitude:number, 
  sectors?: GeoSector[],
};

export type GeoSector = {
  cascade_code?:string,
  latitude?:number,
  longitude?:number, 
  sector_number:number,
  azimuth:number,
  horizontal_bw:number,
};