import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import { RootState, AppDispatch } from ".";
import { fetchGroup } from "../util/browse.service";
import { uiActions } from "./ui.slice";

const browseListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const uiStartListening = browseListener.startListening as typeListener;

uiStartListening({
  actionCreator: uiActions.fetchRegions,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchGroup('regions');
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setRegions(response));
    }
  },
});

uiStartListening({
  actionCreator: uiActions.fetchL4Markets,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchGroup('l4_markets');
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setL4Markets(response));
    }
  },
});

uiStartListening({
  actionCreator: uiActions.fetchL4Markets,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchGroup('l5_markets');
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setL5Markets(response));
    }
  },
});

uiStartListening({
  actionCreator: uiActions.fetchClusters,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchGroup('clusters');
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setClusters(response));
    }
  },
});

export default browseListener;