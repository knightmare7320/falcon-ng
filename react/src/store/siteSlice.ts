import { createSlice } from "@reduxjs/toolkit"
import { Site, Bts, Sector, Carrier } from "../util/site.model"

export type siteType = {
  status: string,
  cascade_code: string,
  load_count: number,
  site: Site,
  bts: Bts[],
  sectors: Sector[],
  carriers: Carrier[],
}

const INITIAL_STATE = {
  status: 'init',
  cascade_code: '',
  load_count: 0,
  site: {} as Site,
  bts: [] as Bts[],
  sectors: [] as Sector[],
  carriers: [] as Carrier[],
}

const siteSlice = createSlice({
  name: 'site',
  initialState: INITIAL_STATE,
  reducers: {

  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;