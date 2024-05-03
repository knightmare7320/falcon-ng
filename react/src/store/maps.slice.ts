import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoSite, GeoSector } from "../util/map.model";


export type MapsBounds = {minLat:number, maxLat: number, minLng:number, maxLng:number};

export type MapsState = {
  mapBounds:MapsBounds|undefined,
  sites:GeoSite[],
  sectors:GeoSector[],
  siteTiles: { 
    [key: string]: GeoSite[],
  },
  sectorTiles: {
    [key: string]: GeoSector[],
  },
};

const INITIAL_STATE = {
  mapBounds: undefined,
  sites: [] as GeoSite[],
  sectors: [] as GeoSector[],
  siteTiles: {},
  sectorTiles: {},
};


const mapsSlice = createSlice({
  name: 'map',
  initialState: INITIAL_STATE,
  reducers: {
    setMapBounds(state:MapsState, action:PayloadAction<MapsBounds>) {
      state.mapBounds = action.payload; 
    },
    setSites(state:MapsState, action:PayloadAction<{bounds:MapsBounds, sites: GeoSite[]}>) {
      // probably need to keep the bounds for this response to check if they have changed
      if (!state.mapBounds || 
          state.mapBounds.minLat === action.payload.bounds.minLat &&
          state.mapBounds.maxLat === action.payload.bounds.maxLat &&
          state.mapBounds.minLng === action.payload.bounds.minLng &&
          state.mapBounds.maxLng === action.payload.bounds.maxLng
      ) {
        state.sites = action.payload.sites;
      }
    },
    clearSites(state:MapsState) {
      state.sites = []
    },
    fetchSiteTile(state:MapsState, action:PayloadAction<{x:number, y:number, z:number}>) {
      // state.load_count++;
      // the action is used by the map.effects, maybe could delete any already existing keys and mapmarkers here
    },
    setSiteTile(state:MapsState, action:PayloadAction<{key:string, sites: GeoSite[]}>) {
      state.siteTiles[action.payload.key] = action.payload.sites;
    },
    clearSiteTile(state:MapsState, action:PayloadAction<{key:string}>) {
      state.siteTiles[action.payload.key].length = 0;
    },
    setSectors(state:MapsState, action:PayloadAction<{bounds:MapsBounds, sectors: GeoSector[]}>) {
      // probably need to keep the bounds for this response to check if they have changed
      if (!state.mapBounds || 
          state.mapBounds.minLat === action.payload.bounds.minLat &&
          state.mapBounds.maxLat === action.payload.bounds.maxLat &&
          state.mapBounds.minLng === action.payload.bounds.minLng &&
          state.mapBounds.maxLng === action.payload.bounds.maxLng
      ) {
        state.sectors = action.payload.sectors;
      }
    },
    clearSectors(state:MapsState) {
      state.sectors = []
    },
    fetchSectorTile(state:MapsState, action:PayloadAction<{x:number, y:number, z:number}>) {
      // state.load_count++;
      // the action is used by the map.effects, maybe could delete any already existing keys and mapmarkers here
    },
    setSectorTile(state:MapsState, action:PayloadAction<{key:string, sectors: GeoSector[]}>) {
      state.sectorTiles[action.payload.key] = action.payload.sectors;
    },
    clearSectorTile(state:MapsState, action:PayloadAction<{key:string}>) {
      state.sectorTiles[action.payload.key].length = 0;
    },
  },
});


export const mapsActions = mapsSlice.actions;
export default mapsSlice.reducer;