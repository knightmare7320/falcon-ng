import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  pageSize: 10,
}

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state.notifications.push({
        type: action.payload.type,
        message: action.payload.message,
      });
    },
    setPageSize(state, action) {
      state.pageSize = action.payload,
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;