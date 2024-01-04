import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageType = {
  type: string, 
  message: string,
  timestamp: Date,
}
type UiType = {
  messages: MessageType[],
}

const initialState: UiType = {
  messages: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
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
          timestamp: new Date(),
       };
       newMessages.unshift(newMessage);

       // this will have the affect of no duplicated messages but the most current timestamp being used
       state.messages = newMessages;
    },
    clearMessages(state) {
      state.messages = [];
    },
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;