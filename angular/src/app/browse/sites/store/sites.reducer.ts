import { createReducer, on } from "@ngrx/store";

import { SitePerf } from "./site.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./sites.actions";

export interface State {
   status: string,
   parent_id: string,
   parent_name: string,
   group_name: string,
   group_type: string,
   group_id: string,
   total_row_count: number,
   perf_rows: SitePerf[],
   page_number: number,
}

const initialState: State = {
   status: 'ok',
   parent_id: '',
   parent_name: '',
   group_name: '',
   group_type: '',
   group_id: '',
   total_row_count: 0,
   perf_rows: [],
   page_number: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   sites: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State, {group_type, group_id}) => {
         return {
            ...state,
            group_type, 
            group_id,
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {group_type, group_id, group_name, parent_id, parent_name, total_row_count, rows }) => {
         return {
            ...state,
            status: 'ok',
            group_type,
            group_id,
            group_name,
            parent_id,
            parent_name,
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