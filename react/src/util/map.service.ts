import { GeoSite } from "./map.model";
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

export async function fetchGeoSiteBounds({minX, maxX, minY, maxY}: {minX:number, maxX:number, minY:number, maxY:number}): Promise<GeoSite[]> {
  const response = await fetch(`${API_URL}/sites/bounds/${minX}/${maxX}/${minY}/${maxY}`);

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  const rows = await response.json();

  return rows;
}