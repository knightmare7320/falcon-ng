import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Site, Bts, Sector, Carrier, Nearest } from "../util/site.model"

export type SiteState = {
  status: string,
  cascade_code: string,
  load_count: number,
  site: Site,
  bts: Bts[],
  sectors: Sector[],
  carriers: Carrier[],
  nearest: Nearest[],
}

const INITIAL_STATE = {
  status: 'init',
  cascade_code: '',
  load_count: 0,
  site: {} as Site,
  bts: [] as Bts[],
  sectors: [] as Sector[],
  carriers: [] as Carrier[],
  nearest: [] as Nearest[],
}

const siteSlice = createSlice({
  name: 'site',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state:SiteState) {
      state.status = 'loading';
    },
    setError(state:SiteState) {
      state.status = 'error';
    },
    setCascade(state:SiteState, action:PayloadAction<string>) {
      state.cascade_code = action.payload;
      // state.load_count ++;
      // state.site = {} as Site;
      // state.bts = [];
      // state.sectors = [];
      // state.carriers = [];
      // state.nearest = [];
    },
    setSiteData(state:SiteState, action: PayloadAction<Site>) {
      state.site = action.payload;
      state.status = 'ok';
    },
    setNearest(state:SiteState, action: PayloadAction<Nearest[]>) {
      state.nearest = action.payload;
    },
    setBtsData(state:SiteState, action: PayloadAction<Bts[]>) {
      state.bts = action.payload;
    },
    setSectorData(state:SiteState, action: PayloadAction<Sector[]>) {
      state.sectors = action.payload;
    },
    setCarrierData(state:SiteState, action: PayloadAction<Carrier[]>) {
      state.carriers = action.payload;
    },
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;