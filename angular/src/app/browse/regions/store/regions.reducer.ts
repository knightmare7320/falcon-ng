import { createReducer, on } from "@ngrx/store";

import { RegionPerf } from "./regions.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./regions.actions";

export interface State {
   status: string,
   total_row_count: number,
   perf_rows: RegionPerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   total_row_count: 0,
   perf_rows: [],
   page_number: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   regions: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State) => {
         return {
            ...state,
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            total_row_count,
            perf_rows: [...rows],
         }
      }
   ),
   on(
      fromActions.setPageNumber,
      (state: State, { page_number }) => {
         return {
            ...state,
            page_number,
            status: 'loading',
         };
      }
   ),
)