import { createReducer, on } from "@ngrx/store";

import { L5MarketPerf } from "./l5-markets.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./l5-markets.actions";

export interface State {
   status: string,
   region_id: string,
   l4_market_id: string,
   l4_market_name: string,
   total_row_count: number,
   perf_rows: L5MarketPerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   region_id: '',
   l4_market_id: '',
   l4_market_name: '',
   total_row_count: 0,
   perf_rows: [],
   page_number: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   l5Markets: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State, {l4_market_id}) => {
         return {
            ...state,
            l4_market_id, 
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {region_id, l4_market_name, total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            region_id,
            l4_market_name,
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