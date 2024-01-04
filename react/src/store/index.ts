import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './ui.slice.ts';
import browseReducer from './browse.slice.ts';
import browseEffects from './browse.effects.ts';
import siteReducer from './site.slice.ts';
import siteEffects from './site.effects.ts';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    browse: browseReducer,
    site: siteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    browseEffects.middleware,
    siteEffects.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
