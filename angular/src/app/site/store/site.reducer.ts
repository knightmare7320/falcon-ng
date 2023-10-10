import { createReducer, on } from "@ngrx/store";

import { Site, Bts, Sector, Carrier } from "./site.model";
import * as fromApp from "../../store/app.reducer";
import * as fromActions from "./site.actions";

export interface State {
   cascade_code: string,
   load_count: number,
   site: Site,
   bts: Bts[],
   sectors: Sector[],
   carriers: Carrier[],
}

const initialState = {
   cascade_code: '',
   load_count: 0,
   site: {} as Site,
   bts: [] as Bts[],
   sectors: [] as Sector[],
   carriers: [] as Carrier[],
}

export interface FeatureState extends fromApp.AppState{
   site: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchSite,
      fromActions.fetchBts,
      fromActions.fetchSectors,
      fromActions.fetchCarriers,

      (state: State, { cascade_code }) => {
         return {
            ...state,
            cascade_code,
            load_count: state.load_count + 1,
         }
      }
   ),
   on(
      fromActions.setSite,
      (state: State, { site }) => {
         return {
            ...state,
            site,
            load_count: state.load_count - 1,
         }
      }
   ),
   on(
      fromActions.setBts,
      (state: State, { bts }) => {
         return {
            ...state,
            bts,
            load_count: state.load_count - 1,
         }
      }
   ),
   on(
      fromActions.setSectors,
      (state: State, { sectors }) => {
         return {
            ...state,
            sectors,
            load_count: state.load_count - 1,
         }
      }
   ),
   on(
      fromActions.setCarriers,
      (state: State, { carriers }) => {
         return {
            ...state,
            carriers,
            load_count: state.load_count - 1,
         }
      }
   ),
);