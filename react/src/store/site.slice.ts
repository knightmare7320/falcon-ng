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
  editSiteOpenFg: boolean,
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
  editSiteOpenFg: false,
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
      const sorted = action.payload.sort((a:Bts, b:Bts) => a.bts_number > b.bts_number ? 1 : -1);
      state.btss = sorted;
    },
    setSectorData(state:SiteState, action: PayloadAction<Sector[]>) {
      const sorted = action.payload.sort(
        (a:Sector, b:Sector) => a.sector_id > b.sector_id ? 1 : -1);
      state.sectors = sorted;
    },
    setCarrierData(state:SiteState, action: PayloadAction<Carrier[]>) {
      const sorted = action.payload.sort(
        (a:Carrier, b:Carrier) => 
          a.bts_id > b.bts_id || a.carrier_designation_name > b.carrier_designation_name ? 1 : -1
      );
      state.carriers = sorted;
    },
    openEditSite(state:SiteState) {
      state.editSiteOpenFg = true;
    },
    closeEditSite(state:SiteState) {
      state.editSiteOpenFg = false;
    },
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;