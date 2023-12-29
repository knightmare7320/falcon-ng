import { createSlice } from "@reduxjs/toolkit";

type uiType = {
  notifications: Array<{
    type: string, 
    message: string
  }>,
  pageSize: number,
}

const initialState: uiType = {
  notifications: [],
  pageSize: 10,
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
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;