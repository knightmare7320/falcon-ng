import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Site, Bts, Sector, Carrier, Nearest } from "../util/site.model"

export type SiteState = {
  status: string,
  cascade_code: string,
  load_count: number,
  site: Site,
  btss: Bts[],
  sectors: Sector[],
  carriers: Carrier[],
  nearest: Nearest[],
}

const INITIAL_STATE = {
  status: 'init',
  cascade_code: '',
  load_count: 0,
  site: {} as Site,
  btss: [] as Bts[],
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
      state.btss = action.payload.sort((a:Bts, b:Bts) => a.bts_number > b.bts_number ? 1 : 0);
    },
    setSectorData(state:SiteState, action: PayloadAction<Sector[]>) {
      state.sectors = action.payload.sort((a:Sector, b:Sector) => a.sector_number > b.sector_number ? 1 : 0);;
    },
    setCarrierData(state:SiteState, action: PayloadAction<Carrier[]>) {
      state.carriers = action.payload.sort(
        (a:Carrier, b:Carrier) => 
          a.bts_id > b.bts_id || a.carrier_number > b.carrier_number ? 1 : 0
      );
    },
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;