import { createReducer, on } from "@ngrx/store";

import { RegionPerf } from "./national-page.model";
import * as fromBrowse from "../../store/browse.reducer";
import * as NationalPageActions from "./national-page.actions";

export interface State {
   status: string,
   totalRows: number,
   regionPerf: RegionPerf[],
   filterString: string,
   pageNumber: number,
   orderBy: string,
   orderDir: string,
}

const initialState: State = {
   status: 'ok',
   totalRows: 0,
   regionPerf: [],
   filterString: '',
   pageNumber: 1,
   orderBy: 'name',
   orderDir: 'asc',
}

export interface FeatureState extends fromBrowse.FeatureState{
   nationalPage: State;
}

export const reducer = createReducer(
   initialState,
   on(
      NationalPageActions.fetchRegionPerf,
      (state: State) => {
         return {
            ...state,
            status: 'loading',
         }
      }
   ),
   on(
      NationalPageActions.setRegionPerf,
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
      NationalPageActions.setFilterString,
      (state: State, { filterString }) => {
         return {
            ...state,
            filterString,
            status: 'loading',
         };
      }
   ),
   on(
      NationalPageActions.setPageNumber,
      (state: State, { pageNumber }) => {
         return {
            ...state,
            pageNumber,
            status: 'loading',
         };
      }
   ),
   on(
      NationalPageActions.setSort,
      (state: State, { orderBy, orderDir }) => {
         return {
            ...state,
            orderBy,
            orderDir,
            status: 'loading',
         };
      }
   ),
)