import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoSite } from "../util/map.model";


export type MapsBounds = {minX:number, maxX: number, minY:number, maxY:number};

export type MapsState = {
  // siteTiles: { 
  //   [key: string]: GeoSite[],
  // },
  mapBounds:MapsBounds|undefined,
  sites:GeoSite[],
};

const INITIAL_STATE = {
  // siteTiles: {},
  mapBounds: undefined,
  sites: [],
};


const mapsSlice = createSlice({
  name: 'map',
  initialState: INITIAL_STATE,
  reducers: {
    setMapBounds(state:MapsState, action:PayloadAction<MapsBounds>) {
      state.mapBounds = action.payload; 
    },
    setSites(state:MapsState, action:PayloadAction<{bounds:MapsBounds, rows: GeoSite[]}>) {
      // probably need to keep the bounds for this response to check if they have changed
      if (!state.mapBounds || 
          state.mapBounds.minX === action.payload.bounds.minX &&
          state.mapBounds.maxX === action.payload.bounds.maxX &&
          state.mapBounds.minY === action.payload.bounds.minY &&
          state.mapBounds.maxY === action.payload.bounds.maxY
      ) {
        state.sites = action.payload.rows;
      }
    },
    clearSites(state:MapsState) {
      state.sites = []
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