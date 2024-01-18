import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupType } from "../util/browse.model";

type Message = {
  type: string, 
  message: string,
  timestamp: Date,
};

type UiState = {
  messages:Message[],
  regions:GroupType[],
  l4_markets:GroupType[],
  l5_markets:GroupType[],
  clusters:GroupType[],
};

const INITIAL_STATE: UiState = {
  messages: [] as Message[],
  regions: [] as GroupType[],
  l4_markets: [] as GroupType[],
  l5_markets: [] as GroupType[],
  clusters: [] as GroupType[],
};

const uiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_STATE,
  reducers: {
    showMessage(state, action:PayloadAction<{type:string, message:string}>) {
      // remove any existing messages with the same text
      const newMessages = state.messages.filter(
        (value: Message) => value.type !== action.payload.type && value.message !== action.payload.message 
      );

       // add this new message to the front with a new timestamp
       const newMessage: Message = {
          type: action.payload.type,
          message: action.payload.message,
          timestamp: new Date(),
       };
       newMessages.unshift(newMessage);

       // this will have the affect of no duplicated messages but the most current timestamp being used
       state.messages = newMessages;
    },
    clearMessages(state) {
      state.messages = [];
    },
    fetchRegions() {},
    setRegions(state, action:PayloadAction<GroupType[]>) {
      state.regions = action.payload;
    },
    fetchL4Markets() {},
    setL4Markets(state, action:PayloadAction<GroupType[]>) {
      state.l4_markets = action.payload;
    },
    fetchL5Markets() {},
    setL5Markets(state, action:PayloadAction<GroupType[]>) {
      state.l5_markets = action.payload;
    },
    fetchClusters() {},
    setClusters(state, action:PayloadAction<GroupType[]>) {
      state.clusters = action.payload;
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;