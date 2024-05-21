import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import {RootState, AppDispatch} from ".";
import { authActions } from "./auth.slice";
import { fetchLogin } from "../util/auth.service";

const authListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const authStartListening = authListener.startListening as typeListener;

let loginTimer:ReturnType<typeof setTimeout>;
const TIMEOUT_TIME = 60 * 60 * 1000;


authStartListening({
  actionCreator: authActions.tryLogin,
  effect: async (action, listenerApi) => {
    let response;
    try {
      response = await fetchLogin(action.payload.username, action.payload.password);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(authActions.loginFailure({message}));
    }
    if (response) {
      const token = response.token;
      const user_id = response.user_id;
      const full_name = response.full_name;

      if(user_id && full_name && token) {
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('full_name', full_name);
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        listenerApi.dispatch(authActions.loginSuccess({user_id, full_name}));

        loginTimer = setTimeout(
          () => {
            listenerApi.dispatch(authActions.setLogout());
          }, TIMEOUT_TIME
        );
      }
    }
  }
});

authStartListening({
  actionCreator: authActions.tryLoadLocal,
  effect: (_, listenerApi) => {
    const user_id = localStorage.getItem('user_id');
    const full_name = localStorage.getItem('full_name');
    const token = localStorage.getItem('token');

    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = storedExpirationDate ? new Date(storedExpirationDate) : new Date();
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    
    if (duration && user_id && full_name && token && duration > 0) {
      listenerApi.dispatch(authActions.loginSuccess({user_id, full_name}));
      loginTimer = setTimeout(
        () => {
          listenerApi.dispatch(authActions.setLogout());
        }, duration
      );
    } else {
      localStorage.removeItem('user_id');
      localStorage.removeItem('full_name');
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    }
  }
});

// TODO: on logout cancel timeout
authStartListening({
  actionCreator: authActions.setLogout,
  effect: () => {
    clearTimeout(loginTimer);
    localStorage.removeItem('user_id');
    localStorage.removeItem('full_name');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
});

export default authListener;