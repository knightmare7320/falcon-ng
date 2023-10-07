import { createReducer, on } from "@ngrx/store";

import { L4MarketPerf } from "./l4-market.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./l4-markets.actions";

export interface State {
   status: string,
   group_id: string,
   group_name: string,
   total_row_count: number,
   perf_rows: L4MarketPerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   group_id: '',
   group_name: '',
   total_row_count: 0,
   perf_rows: [],
   page_number: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   l4Markets: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State, {region_id}) => {
         return {
            ...state,
            group_id: region_id, 
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {group_name, total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            group_name,
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