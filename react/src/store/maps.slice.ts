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
    // fetchSiteTile(state:MapState, action:PayloadAction<{key:string, coords:{x:number, y:number, z:number}}>) {
    //   state.load_count++;
    //   // the action is used by the map.effects, maybe could delete any already existing keys and mapmarkers here
    // },
    // addSiteTile(state:MapState, action: PayloadAction<{key: string, tile: GeoSite[]}>) {
    //   state.load_count--;
    //   state.siteTiles[action.payload.key] = action.payload.tile;
    // },
    // removeSiteTile(state:MapState, action: PayloadAction<string>) {
    //   const key = action.payload;
    //   delete state.siteTiles[key];
    // },
  },
});


export const mapsActions = mapsSlice.actions;
export default mapsSlice.reducer;