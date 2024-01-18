import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './ui.slice.ts';
import uiEffects from './ui.effects.ts';
import browseReducer from './browse.slice.ts';
import browseEffects from './browse.effects.ts';
import siteReducer from './site.slice.ts';
import siteEffects from './site.effects.ts';
import mapsReducer from './maps.slice.ts';
import mapsEffects from './maps.effects.ts';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    browse: browseReducer,
    site: siteReducer,
    maps: mapsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    uiEffects.middleware,
    browseEffects.middleware,
    siteEffects.middleware,
    mapsEffects.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
