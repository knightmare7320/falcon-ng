import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Message = {
  type: string, 
  message: string,
  timestamp: Date,
}
type UiState = {
  messages: Message[],
}

const INITIAL_STATE: UiState = {
  messages: [],
}

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
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;