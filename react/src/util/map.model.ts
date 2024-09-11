export type GeoSite = {
  cascadeCode:string,
  latitude:number,
  longitude:number, 
  sectors?: GeoSector[],
};

export type GeoSector = {
  cascadeCode?:string,
  latitude?:number,
  longitude?:number, 
  sectorNumber:number,
  azimuth:number,
  horizontalBw:number,
};