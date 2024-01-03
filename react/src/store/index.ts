import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './uiSlice.ts';
import browseReducer from './browseSlice.ts';
import browseListener from './browseListener.ts';
import siteReducer from './siteSlice.ts';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    browse: browseReducer,
    site: siteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(browseListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
