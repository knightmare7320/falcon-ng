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
    let response;
    try {
      response = await fetchLogin(action.payload.username, action.payload.password);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(authActions.loginFailure({message}));
    }
    if (response) {
      listenerApi.dispatch(authActions.loginSuccess({user_id: response.user_id, full_name: response.full_name, token: response.token}));
    }
  },
});

export default authListener;