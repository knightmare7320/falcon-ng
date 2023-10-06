import { createReducer, on } from "@ngrx/store";

import { OrgClusterPerf } from "./org-cluster.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./org-clusters.actions";

export interface State {
   status: string,
   l4_market_id: string,
   l5_market_id: string,
   l5_market_name: string,
   total_row_count: number,
   perf_rows: OrgClusterPerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   l4_market_id: '',
   l5_market_id: '',
   l5_market_name: '',
   total_row_count: 0,
   perf_rows: [],
   page_number: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   orgClusters: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State, {l5_market_id}) => {
         return {
            ...state,
            l5_market_id, 
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {l4_market_id, l5_market_name, total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            l4_market_id,
            l5_market_name,
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