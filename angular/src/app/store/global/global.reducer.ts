import { createReducer, on } from "@ngrx/store";

import * as fromApp from "../app.reducer";
import * as GlobalActions from "./global.actions";

export interface State {
   pageSize: number;
}

const initialState: State = {
   pageSize: 10, //localStorage.getItem('pageSize') ? +localStorage.getItem('pageSize') : 10,
}

export interface FeatureState extends fromApp.AppState {
   global: State;
}

export const reducer = createReducer(
   initialState,
   on(
      GlobalActions.setPageSize,
      (state: State, { pageSize }) => {
         localStorage.setItem('pageSize', pageSize.toString());
         return {
            ...state,
            pageSize,
         };
      }
   ),
);