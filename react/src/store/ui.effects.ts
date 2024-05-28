import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from '@reduxjs/toolkit'

import { RootState, AppDispatch } from ".";
import { fetchGroup } from "../util/browse.service";
import { fetchSiteTypes, fetchStructureTypes, fetchRepairPriorities, fetchTimezones } from "../util/site.service";
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

uiStartListening({
  actionCreator: uiActions.fetchSiteTypes,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchSiteTypes();
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setSiteTypes(response));
    }
  },
});
uiStartListening({
  actionCreator: uiActions.fetchStructureTypes,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchStructureTypes();
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setStructureTypes(response));
    }
  },
});
uiStartListening({
  actionCreator: uiActions.fetchRepairPriorities,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchRepairPriorities();
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setRepairPriorities(response));
    }
  },
});
uiStartListening({
  actionCreator: uiActions.fetchTimezones,
  effect: async (_, listenerApi) => {
    let response;
    try {
      response = await fetchTimezones();
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    }
    if (response) {
      listenerApi.dispatch(uiActions.setTimezonesTypes(response));
    }
  },
});

export default browseListener;