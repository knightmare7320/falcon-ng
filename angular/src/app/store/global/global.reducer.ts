import { createReducer, on } from "@ngrx/store";

import * as fromApp from "../app.reducer";
import * as GlobalActions from "./global.actions";

export interface State {
   page_size: number;
   filter_string: string;
   order_by: string;
   order_dir: string;
}

const initialState: State = {
   page_size: 10, //localStorage.getItem('pageSize') ? +localStorage.getItem('pageSize') : 10,
   filter_string: '',
   order_by: 'name',
   order_dir: 'asc',
}

export interface FeatureState extends fromApp.AppState {
   global: State;
}

export const reducer = createReducer(
   initialState,
   on(
      GlobalActions.setPageSize,
      (state: State, { page_size }) => {
         // localStorage.setItem('page_size', page_size.toString());
         return {
            ...state,
            page_size,
         };
      }
   ),
   on(
      GlobalActions.setFilterString,
      (state: State, { filter_string }) => {
         return {
            ...state,
            filter_string,
         };
      }
   ),
   on(
      GlobalActions.setSort,
      (state: State, { order_by, order_dir }) => {
         return {
            ...state,
            order_by,
            order_dir,
            status: 'loading',
         };
      }
   ),
);