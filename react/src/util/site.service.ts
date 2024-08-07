import { Site, Bts, Sector, Carrier, Nearest } from "./site.model";
import { LookupType } from './ui.model.ts';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL + '/site';

export async function fetchSite(cascade_code: string): Promise<Site> {
  const response = await fetch(`${API_URL}/${cascade_code}`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchBts(cascade_code: string): Promise<Bts[]> {
  const response = await fetch(`${API_URL}/${cascade_code}/bts`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchSectors(cascade_code: string): Promise<Sector[]> {
  const response = await fetch(`${API_URL}/${cascade_code}/sectors`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchCarriers(cascade_code: string): Promise<Carrier[]> {
  const response = await fetch(`${API_URL}/${cascade_code}/carriers`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchNearest(cascade_code: string): Promise<Nearest[]> {
  const response = await fetch(`${API_URL}/${cascade_code}/nearest`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchPictureList(cascade_code: string): Promise<string[]> {
  const response = await fetch(`/pictures/list/${cascade_code}`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}


export async function fetchSiteTypes(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/site_types`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchStructureTypes(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/structure_types`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchRepairPriorities(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/repair_priorities`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchTimezones(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/timezones`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}