import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { GroupType } from "../util/browse.model";
import { MessageType, LookupType } from "../util/ui.model";

type UiState = {
  messages:MessageType[],
  regions:GroupType[],
  l4_markets:GroupType[],
  l5_markets:GroupType[],
  clusters:GroupType[],
  site_types:LookupType[],
  structure_types:LookupType[],
  repair_priorities:LookupType[],
  timezones:LookupType[],
};

const INITIAL_STATE: UiState = {
  messages: [] as MessageType[],
  regions: [] as GroupType[],
  l4_markets: [] as GroupType[],
  l5_markets: [] as GroupType[],
  clusters: [] as GroupType[],
  site_types: [] as LookupType[],
  structure_types: [] as LookupType[],
  repair_priorities: [] as LookupType[],
  timezones: [] as LookupType[],
};

const uiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_STATE,
  reducers: {
    showMessage(state, action:PayloadAction<{type:string, message:string}>) {
      // remove any existing messages with the same text
      const newMessages = state.messages.filter(
        (value: MessageType) => value.type !== action.payload.type && value.message !== action.payload.message 
      );

       // add this new message to the front with a new timestamp
       const newMessage: MessageType = {
          type: action.payload.type,
          message: action.payload.message,
          timestamp: moment().format('M/D/YYYY h:mm:ssa'),
       };
       newMessages.unshift(newMessage);

       // this will have the affect of no duplicated messages but the most current timestamp being used
       state.messages = newMessages;
    },
    deleteMessage(state, action:PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
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
    },    fetchSiteTypes() {},
    setSiteTypes(state, action:PayloadAction<LookupType[]>) {
      state.site_types = action.payload;
    },
    fetchStructureTypes() {},
    setStructureTypes(state, action:PayloadAction<LookupType[]>) {
      state.structure_types = action.payload;
    },
    fetchRepairPriorities() {},
    setRepairPriorities(state, action:PayloadAction<LookupType[]>) {
      state.repair_priorities = action.payload;
    },
    fetchTimezones() {},
    setTimezonesTypes(state, action:PayloadAction<LookupType[]>) {
      state.timezones = action.payload;
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;