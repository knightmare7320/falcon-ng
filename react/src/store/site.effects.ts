import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { PayloadAction, TypedStartListening } from '@reduxjs/toolkit'

import {RootState, AppDispatch} from ".";
import { uiActions } from "./ui.slice";

import { siteActions } from "./site.slice";
import { fetchSite, fetchNearest, fetchBts, fetchSectors, fetchCarriers, fetchPictureList } from "../util/site.service";
import { Site } from "../util/site.model";

const siteListener = createListenerMiddleware();

type typeListener = TypedStartListening<RootState, AppDispatch>;
const siteStartListening = siteListener.startListening as typeListener;


siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:PayloadAction<string>, listenerApi) => {
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
  effect: async (action:PayloadAction<string>, listenerApi) => {
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

siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:PayloadAction<string>, listenerApi) => {
    let response;
    try {
      response = await fetchBts(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setBtsData(response));
    }
  },
});

siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:PayloadAction<string>, listenerApi) => {
    let response;
    try {
      response = await fetchSectors(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setSectorData(response));
    }
  },
});

siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:PayloadAction<string>, listenerApi) => {
    let response;
    try {
      response = await fetchCarriers(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setCarrierData(response));
    }
  },
});

siteStartListening({
  actionCreator: siteActions.saveEditSite,
  effect: async (action:PayloadAction<Site>, listenerApi) => {
    let response;
    // try {
    //   response = await fetchCarriers(action.payload);
    // } catch(error) {
    //   let message = 'Unknown Error';
    //   if (error instanceof Error) message = error.message;
    //   listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
    //   listenerApi.dispatch(siteActions.setError());
    // }
    // if (response) {
    //   listenerApi.dispatch(siteActions.setCarrierData(response));
    // }
  },
});

siteStartListening({
  actionCreator: siteActions.setCascade,
  effect: async (action:PayloadAction<string>, listenerApi) => {
    let response;
    try {
      response = await fetchPictureList(action.payload);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      listenerApi.dispatch(siteActions.setError());
    }
    if (response) {
      listenerApi.dispatch(siteActions.setPictureList(response));
    }
  },
});

export default siteListener;