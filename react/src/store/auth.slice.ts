import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  show_login: boolean,
  status: string,
  message?: string,
  user_id: string,
  full_name?: string,
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
    // @ts-ignore
    tryLogin(state, action:PayloadAction<{username:string, password:string}>) {
      state.status = 'submitting';
      state.message = '';
    },
    tryLoadLocal() {},
    loginSuccess(state, action:PayloadAction<{user_id:string, full_name:string}>) {
      state.status = 'ok';
      state.user_id = action.payload.user_id;
      state.full_name = action.payload.full_name;
      state.show_login = false;
    },
    loginFailure(state, action:PayloadAction<{message:string}>) {
      state.status = 'error';
      state.message = action.payload.message;
    },
    setLogout(state) {
      state.status = 'none';
      state.user_id = '';
      state.full_name = undefined;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;