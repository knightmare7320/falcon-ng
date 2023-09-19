import { createReducer, on } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './auth.actions'; 

export interface State {
   userId: string;
   userName: string;
   token: string;
   expirationDate: Date | null;
   isAuthenticated: boolean;
   loginVisible: boolean;
}

export interface FeatureState extends fromApp.AppState {
   auth: State;
}

export const initialState: State = {
   userId: '',
   userName: 'Guest',
   token: '',
   expirationDate: null,
   isAuthenticated: false,
   loginVisible: false,
};

export const getIsAuthenticated = (state: FeatureState) => state.auth.isAuthenticated;

export const getToken = (state: FeatureState) => state.auth.token;

export const getUserName = (state: FeatureState) => state.auth.userName;

export const getLoginVisible = (state: FeatureState) => state.auth.loginVisible;

export const reducer = createReducer(
   initialState,
   on(
      AuthActions.OpenLoginWindow,
      () => {
         return {
         ...initialState,  
         loginVisible: true,
         }
      }
   ),
   on(
      AuthActions.CloseLoginWindow,
      () => {
         return {
         ...initialState,  
         loginVisible: false,
         }
      }
   ),
   on(
      AuthActions.Authenticated,
      ( state: State, { userId, userName, token, expiresIn }) => {
         const now = new Date();
         const expirationDate = new Date(now.getTime() + expiresIn * 1000);
         
         return {
            ...state,
            userId,
            userName,
            token,
            expirationDate,
            isAuthenticated: true,
            loginVisible: false,
         };
      }
   ),
   // on(
   //    AuthActions.AutoLogin,
   //    () => {
   //       const userId = localStorage.getItem('userId');
   //       const userName = localStorage.getItem('userName');
   //       const token = localStorage.getItem('id-token');
   //       const expirationDate = localStorage.getItem('id-token-expiration');
   
   //       if (expirationDate) {
   //       const now = new Date();
   //       const expiresIn = new Date(expirationDate).getTime() - now.getTime();
   //       if (expiresIn > 0) {
   //          return {
   //             ...initialState,
   //             userId: userId,
   //             userName: userName,
   //             token: token,
   //             expirationDate: new Date(expirationDate),
   //             isAuthenticated: true,
   //          };
   //       }
   //       }
   //       return { ...initialState };
   //    }
   // ),
   on(
      AuthActions.Logout,
      () => {
         return initialState;
      }
   ),
);