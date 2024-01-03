import { configureStore } from "@reduxjs/toolkit";

import uiReducer from './uiSlice.ts';
import browseReducer from './browseSlice.ts';
import browseListener from './browseListener.ts';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    browse: browseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(browseListener.middleware),
});

export default store;
