import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  show_login: boolean,
  status: string,
  message: string,
  user_id: string,
  user_name: string,
};

const INITIAL_STATE: AuthState = {
  show_login: false,
  status: 'none',
  message: '',
  user_id: '',
  user_name: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    showLogin(state) {
      state.show_login = true;
    },
    cancelLogin(state) {
      state.show_login = false;
    },
    setLogin(state, action:PayloadAction<{user_id:string, user_name:string}>) {
      state.user_id = action.payload.user_id;
      state.user_name = action.payload.user_name;
      state.show_login = false;
    },
    setLogout(state) {
      state = INITIAL_STATE;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;