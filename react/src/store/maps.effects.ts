import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { Action, TypedStartListening } from '@reduxjs/toolkit';

import { RootState, AppDispatch } from ".";
import { uiActions } from "./ui.slice";
import { mapsActions } from "./maps.slice";
import { fetchGeoSiteBounds } from "../util/map.service";

type typeListener = TypedStartListening<RootState, AppDispatch>;

const mapListener = createListenerMiddleware();
const mapStartListening = mapListener.startListening as typeListener;


// mapStartListening({
//   actionCreator: mapActions.fetchSiteTile,
//   effect: async (action:Action, listenerApi) => {
//     const key = action.payload.key;
//     const coords = action.payload.coords;

//     let response;
//     try {
//       response = await fetchGeoSite(key, coords);
//     } catch(error) {
//       let message = 'Unknown Error';
//       if (error instanceof Error) message = error.message;
//       listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
//       // listenerApi.dispatch(siteActions.setError());
//       return;
//     }

//     if (response.rows.length > 0) {
//       listenerApi.dispatch(mapActions.addSiteTile({key, tile: response.rows}));
//     }
//   },
// });


mapStartListening({
  actionCreator: mapsActions.setMapBounds,
  effect: async (action:Action, listenerApi) => {
    const bounds = action.payload;

    let response;
    try {
      response = await fetchGeoSiteBounds(bounds);
    } catch(error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      listenerApi.dispatch(uiActions.showMessage({type: 'error', message}));
      // listenerApi.dispatch(siteActions.setError());
      return;
    }

    listenerApi.dispatch(mapsActions.setSites({bounds, rows: response}));
  },
});

export default mapListener;