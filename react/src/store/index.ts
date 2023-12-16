import { configureStore } from "@reduxjs/toolkit";

import uiSlice from './ui-slice.ts';

const store = configureStore({
  ui: uiSlice.reducer,
});

export default store;
