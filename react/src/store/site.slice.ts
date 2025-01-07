import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Site, Bts, Sector, Carrier, Nearest } from "../util/site.model"

export type SiteState = {
  status: string,
  cascade_code: string,
  site: Site,
  btss: Bts[],
  sectors: Sector[],
  carriers: Carrier[],
  nearest: Nearest[],
  pictures: string[],
  editSiteOpenFg: boolean,
}

const INITIAL_STATE = {
  status: 'init',
  cascade_code: '',
  site: {} as Site,
  btss: [] as Bts[],
  sectors: [] as Sector[],
  carriers: [] as Carrier[],
  nearest: [] as Nearest[],
  pictures: [],
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
      state.status = 'init';
      state.cascade_code = action.payload;
      // state.site = {} as Site;
      // state.btss = [] as Bts[];
      // state.sectors = [] as Sector[];
      // state.carriers = [] as Carrier[];
      // state.nearest = [] as Nearest[];
      state.pictures = [];
      state.editSiteOpenFg = false;
    },
    setSiteData(state:SiteState, action:PayloadAction<Site>) {
      state.site = action.payload;
      state.status = 'ok';
    },
    setNearest(state:SiteState, action:PayloadAction<Nearest[]>) {
      state.nearest = action.payload;
    },
    setBtsData(state:SiteState, action:PayloadAction<Bts[]>) {
      const sorted = action.payload.sort((a:Bts, b:Bts) => a.btsNumber > b.btsNumber ? 1 : -1);
      state.btss = sorted;
    },
    setSectorData(state:SiteState, action:PayloadAction<Sector[]>) {
      const sorted = action.payload.sort(
        (a:Sector, b:Sector) => a.sectorId > b.sectorId ? 1 : -1);
      state.sectors = sorted;
    },
    setCarrierData(state:SiteState, action:PayloadAction<Carrier[]>) {
      const sorted = action.payload.sort(
        (a:Carrier, b:Carrier) => 
          a.btsId > b.btsId || a.carrierDesignationName > b.carrierDesignationName ? 1 : -1
      );
      state.carriers = sorted;
    },
    openEditSite(state:SiteState) {
      state.editSiteOpenFg = true;
    },
    closeEditSite(state:SiteState) {
      state.editSiteOpenFg = false;
    },
    saveEditSite(state:SiteState, action:PayloadAction<Site>) {
      
    },
    saveEditSiteError(state:SiteState, action:PayloadAction<{message:string}>) {

    },
    saveEditSiteSuccess(state:SiteState) {
      state.editSiteOpenFg = false;
    },
    setPictureList(state:SiteState, action:PayloadAction<string[]>) {
      state.pictures = action.payload;
    }
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;