import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { GroupType, RegionGroupType, L4MarketGroupType, L5MarketGroupType, OrgClusterGroupType } from "../util/browse.model";
import { MessageType, LookupType } from "../util/ui.model";

type UiState = {
  messages:MessageType[],
  regions:RegionGroupType[],
  l4Markets:L4MarketGroupType[],
  l5Markets:L5MarketGroupType[],
  orgClusters:OrgClusterGroupType[],
  siteTypes:LookupType[],
  structureTypes:LookupType[],
  repairPriorities:LookupType[],
  timezones:LookupType[],
};

const INITIAL_STATE: UiState = {
  messages: [] as MessageType[],
  regions: [] as RegionGroupType[],
  l4Markets: [] as L4MarketGroupType[],
  l5Markets: [] as L5MarketGroupType[],
  orgClusters: [] as OrgClusterGroupType[],
  siteTypes: [] as LookupType[],
  structureTypes: [] as LookupType[],
  repairPriorities: [] as LookupType[],
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
    setRegions(state, action:PayloadAction<RegionGroupType[]>) {
      state.regions = action.payload;
    },
    fetchL4Markets() {},
    setL4Markets(state, action:PayloadAction<L4MarketGroupType[]>) {
      state.l4Markets = action.payload;
    },
    fetchL5Markets() {},
    setL5Markets(state, action:PayloadAction<L5MarketGroupType[]>) {
      state.l5Markets = action.payload;
    },
    fetchOrgClusters() {},
    setOrgClusters(state, action:PayloadAction<OrgClusterGroupType[]>) {
      state.orgClusters = action.payload;
    },    fetchSiteTypes() {},
    setSiteTypes(state, action:PayloadAction<LookupType[]>) {
      state.siteTypes = action.payload;
    },
    fetchStructureTypes() {},
    setStructureTypes(state, action:PayloadAction<LookupType[]>) {
      state.structureTypes = action.payload;
    },
    fetchRepairPriorities() {},
    setRepairPriorities(state, action:PayloadAction<LookupType[]>) {
      state.repairPriorities = action.payload;
    },
    fetchTimezones() {},
    setTimezonesTypes(state, action:PayloadAction<LookupType[]>) {
      state.timezones = action.payload;
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;