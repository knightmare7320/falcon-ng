import { createReducer, on } from "@ngrx/store";

import { RegionPerf } from "./regions.model";
import * as fromBrowse from "../../store/browse.reducer";
import * as RegionsActions from "./regions.actions";

export interface State {
   status: string,
   totalRows: number,
   regionPerf: RegionPerf[],
   pageNumber: number,
}

const initialState: State = {
   status: 'ok',
   totalRows: 0,
   regionPerf: [],
   pageNumber: 1,
}

export interface FeatureState extends fromBrowse.FeatureState{
   regions: State;
}

export const reducer = createReducer(
   initialState,
   on(
      RegionsActions.fetchRegionPerf,
      (state: State) => {
         return {
            ...state,
            status: 'loading',
         }
      }
   ),
   on(
      RegionsActions.setRegionPerf,
      (state: State, {totalRows, rows }) => {
         return {
            ...state,
            status: 'ok',
            totalRows,
            regionPerf: [...rows],
         }
      }
   ),
   on(
      RegionsActions.setPageNumber,
      (state: State, { pageNumber }) => {
         return {
            ...state,
            pageNumber,
            status: 'loading',
         };
      }
   ),
)