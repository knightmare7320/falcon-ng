import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  showLogin: boolean,
  status: string,
  message?: string,
  userId: string,
  fullName?: string,
};

const INITIAL_STATE: AuthState = {
  showLogin: false,
  status: 'none',
  userId: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    showLogin(state) {
      state.showLogin = true;
    },
    cancelLogin(state) {
      state.showLogin = false;
    },
    // @ts-ignore
    tryLogin(state, action:PayloadAction<{username:string, password:string}>) {
      state.status = 'submitting';
      state.message = '';
    },
    tryLoadLocal() {},
    loginSuccess(state, action:PayloadAction<{userId:string, fullName:string}>) {
      state.status = 'ok';
      state.userId = action.payload.userId;
      state.fullName = action.payload.fullName;
      state.showLogin = false;
    },
    loginFailure(state, action:PayloadAction<{message:string}>) {
      state.status = 'error';
      state.message = action.payload.message;
    },
    setLogout(state) {
      state.status = 'none';
      state.userId = '';
      state.fullName = undefined;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;