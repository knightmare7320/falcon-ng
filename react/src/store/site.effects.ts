import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { Action, TypedStartListening } from '@reduxjs/toolkit'

import {RootState, AppDispatch} from ".";
import { uiActions } from "./ui.slice";

import { siteActions } from "./site.slice";
import { fetchSite, fetchNearest } from "../util/site.service";

const siteListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const siteStartListening = siteListener.startListening as typeListener;


siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:Action, listenerApi) => {
    listenerApi.dispatch(siteActions.setLoading());
    let response;
    try {
      response = await fetchSite(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setSiteData(response));
    }
  },
});

siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:Action, listenerApi) => {
    let response;
    try {
      response = await fetchNearest(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setNearest(response));
    }
  },
});

export default siteListener;