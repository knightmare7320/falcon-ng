import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth.slice.ts';
import authEffects from './auth.effects.ts';
import uiReducer from './ui.slice.ts';
import uiEffects from './ui.effects.ts';
import browseReducer from './browse.slice.ts';
import browseEffects from './browse.effects.ts';
import siteReducer from './site.slice.ts';
import siteEffects from './site.effects.ts';
import mapsReducer from './maps.slice.ts';
import mapsEffects from './maps.effects.ts';
import searchReducer from './search.slice.ts';
import searchEffects from './search.effect.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    browse: browseReducer,
    site: siteReducer,
    maps: mapsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    authEffects.middleware,
    uiEffects.middleware,
    browseEffects.middleware,
    siteEffects.middleware,
    mapsEffects.middleware,
    searchEffects.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
