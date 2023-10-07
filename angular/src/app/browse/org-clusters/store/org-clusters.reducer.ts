import { createReducer, on } from "@ngrx/store";

import { OrgClusterPerf } from "./org-cluster.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./org-clusters.actions";

export interface State {
   status: string,
   parent_id: string,
   parent_name: string
   group_id: string,
   group_name: string,
   total_row_count: number,
   perf_rows: OrgClusterPerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   parent_id: '',
   parent_name: '',
   group_id: '',
   group_name: '',
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
            group_id: l5_market_id, 
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {parent_id, parent_name, group_name, total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            parent_id,
            parent_name,
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