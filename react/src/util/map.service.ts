import { GeoSite, GeoSector } from "./map.model";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL + '/geo';


export async function fetchGeoSite(key:string, coords:{x:number, y:number, z:number}): Promise<{key:string, rows:GeoSite[]}> {
  const response = await fetch(`${API_URL}/sites/${coords.z}/${coords.x}/${coords.y}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();
  const json = {
    key,
    rows,
  };

  return json;
}

export async function fetchGeoSiteBounds({minLat, maxLat, minLng, maxLng}: {minLat:number, maxLat:number, minLng:number, maxLng:number}): Promise<GeoSite[]> {
  const response = await fetch(`${API_URL}/sites?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();

  return rows;
}


export async function fetchGeoSectorBounds({minLat, maxLat, minLng, maxLng}: {minLat:number, maxLat:number, minLng:number, maxLng:number}): Promise<GeoSector[]> {
  const response = await fetch(`${API_URL}/sectors?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();

  return rows;
}