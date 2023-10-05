import { createReducer, on } from "@ngrx/store";

import { L4MarketPerf } from "./l4-markets.model";
import * as fromReducer from "../../store/browse.reducer";
import * as fromActions from "./l4-markets.actions";

export interface State {
   status: string,
   regionId: string,
   regionName: string,
   totalRowCount: number,
   perfRows: L4MarketPerf[],
   pageNumber: number,
}

const initialState: State = {
   status: 'ok',
   regionId: '',
   regionName: '',
   totalRowCount: 0,
   perfRows: [],
   pageNumber: 1,
}

export interface FeatureState extends fromReducer.FeatureState{
   l4Markets: State;
}

export const reducer = createReducer(
   initialState,
   on(
      fromActions.fetchPerf,
      (state: State, {regionId}) => {
         return {
            ...state,
            regionId, 
            status: 'loading',
         }
      }
   ),
   on(
      fromActions.setPerf,
      (state: State, {regionName, totalRows, rows }) => {
         return {
            ...state,
            status: 'ok',
            regionName,
            totalRowCount: totalRows,
            perfRows: [...rows],
         }
      }
   ),
   on(
      fromActions.setPageNumber,
      (state: State, { pageNumber }) => {
         return {
            ...state,
            pageNumber,
            status: 'loading',
         };
      }
   ),
)