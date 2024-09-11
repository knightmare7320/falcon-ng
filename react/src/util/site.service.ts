import { Site, Bts, Sector, Carrier, Nearest } from "./site.model";
import { LookupType } from './ui.model.ts';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL + '/site';

export async function fetchSite(cascadeCode: string): Promise<Site> {
  const response = await fetch(`${API_URL}/${cascadeCode}`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchBts(cascadeCode: string): Promise<Bts[]> {
  const response = await fetch(`${API_URL}/${cascadeCode}/bts`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchSectors(cascadeCode: string): Promise<Sector[]> {
  const response = await fetch(`${API_URL}/${cascadeCode}/sectors`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchCarriers(cascadeCode: string): Promise<Carrier[]> {
  const response = await fetch(`${API_URL}/${cascadeCode}/carriers`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}

export async function fetchNearest(cascadeCode: string): Promise<Nearest[]> {
  const response = await fetch(`${API_URL}/${cascadeCode}/nearest`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchPictureList(cascadeCode: string): Promise<string[]> {
  const response = await fetch(`/pictures/list/${cascadeCode}`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}


export async function fetchSiteTypes(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/siteTypes`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchStructureTypes(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/structureTypes`);
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }
  return await response.json();
}
export async function fetchRepairPriorities(): Promise<LookupType[]> {
  const response = await fetch(`${API_URL}/repairPriorities`);
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