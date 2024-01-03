import { createSlice } from "@reduxjs/toolkit";

type uiType = {
  notifications: Array<{
    type: string, 
    message: string
  }>,
}

const initialState: uiType = {
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notifications.push({
        type: action.payload.type,
        message: action.payload.message,
      });
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;