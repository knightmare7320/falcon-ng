import { GeoSite, GeoSector } from "./map.model";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL + '/geo';


export async function fetchGeoSiteTile({x, y, z}:{x:number, y:number, z:number}): Promise<{key:string, sites:GeoSite[]}> {
  const response = await fetch(`${API_URL}/tile/sites/${z}/${x}/${y}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();
  const json = {
    key: x+":"+y+":"+z,
    sites: [...rows],
  };

  return json;
}

export async function fetchGeoSectorTile({x, y, z}:{x:number, y:number, z:number}): Promise<{key:string, sites:GeoSite[]}> {
  const response = await fetch(`${API_URL}/tile/sectors/${z}/${x}/${y}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();
  const json = {
    key: x+":"+y+":"+z,
    sites: [...rows],
  };

  return json;
}

export async function fetchGeoSiteBounds({minLat, maxLat, minLng, maxLng}: {minLat:number, maxLat:number, minLng:number, maxLng:number}): Promise<GeoSite[]> {
  const response = await fetch(`${API_URL}/bounds/sites?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();

  return rows;
}


export async function fetchGeoSectorBounds({minLat, maxLat, minLng, maxLng}: {minLat:number, maxLat:number, minLng:number, maxLng:number}): Promise<GeoSector[]> {
  const response = await fetch(`${API_URL}/bounds/sectors?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();

  return rows;
}