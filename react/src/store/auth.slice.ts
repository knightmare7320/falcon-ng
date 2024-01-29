import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  show_login: boolean,
  status: string,
  message?: string,
  user_id: string,
  user_name?: string,
  token?: string,
};

const INITIAL_STATE: AuthState = {
  show_login: false,
  status: 'none',
  user_id: '',
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
    tryLogin(state, action:PayloadAction<{email:string, password:string}>) {
      state.status = 'submitting';
      state.message = '';
    },
    loginSuccess(state, action:PayloadAction<{user_id:string, user_name:string}>) {
      state.user_id = action.payload.user_id;
      state.user_name = action.payload.user_name;
      state.show_login = false;
    },
    loginFailure(state, action:PayloadAction<{message:string}>) {
      state.status = 'error';
      state.message = action.payload.message;
    },
    setLogout(state) {
      state = INITIAL_STATE;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;