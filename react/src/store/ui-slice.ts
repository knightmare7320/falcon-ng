import { createSlice } from "@reduxjs/toolkit";

type uiType = {
  notifications: Array<{
    type: string, 
    message: string
  }>,
  pageSize: number,
  pageSizes: Array<number>,
  sortBy: string,
  sortDir: string,
}

const initialState: uiType = {
  notifications: [],
  pageSize: 10,
  pageSizes: [7, 15, 30],
  sortBy: 'name',
  sortDir: 'ASC',
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
    setSort(state, action) {
      state.sortBy = action.payload.sortBy;
      state.sortDir = action.payload.sortDir;
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;