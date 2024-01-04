import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    showNotification(state, action:PayloadAction<{type:string, message:string}>) {
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