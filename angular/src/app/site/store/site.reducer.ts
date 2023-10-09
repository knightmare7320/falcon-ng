import { createReducer, on } from "@ngrx/store";

import { Site, Bts, Sector, Carrier } from "./site.model";
import * as fromApp from "../../store/app.reducer";
// import * as fromActions from "./site.actions";

export interface State {
   site: Site,
   btss: Bts[],
   sectors: Sector[],
   carriers: Carrier[],
}

const initialState = {
   site: [],
   btss: [],
   sectors: [],
   carriers: {},
}

export interface FeatureState extends fromApp.AppState{
   site: State;
}

export const reducer = createReducer(
   initialState,
   // on(
   //    fromActions.fetchPerf,
   //    (state: State, {region_id}) => {
   //       return {
   //          ...state,
   //          group_id: region_id, 
   //          status: 'loading',
   //       }
   //    }
   // ),
);