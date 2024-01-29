import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import {RootState, AppDispatch} from ".";
import { authActions } from "./auth.slice";
import { fetchLogin } from "../util/auth.service";

const authListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const authStartListening = authListener.startListening as typeListener;

authStartListening({
  actionCreator: authActions.tryLogin,
  effect: async (action, listenerApi) => {
    console.log(action.payload.email, action.payload.password);
    let response;
    try {
      response = await fetchLogin(action.payload.email, action.payload.password);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      // listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      // listenerApi.dispatch(browseActions.setError());
    }
    if (response) {
      // listenerApi.dispatch(authActions.loginSuccess(response));
    }
  },
});

export default authListener;