import { createAction, props } from '@ngrx/store';

export const OpenLoginWindow = createAction(
   '[auth] Open Login Window',
);

export const CloseLoginWindow = createAction(
   '[auth] Close Login Window',
);

export const AutoLogin = createAction(
   '[auth] Auto-Login',
);

export const Login = createAction(
   '[auth] Login',
   props<{
      username: string,
      password: string,
   }>(),
);

export const Logout = createAction(
   '[auth] Logout',
);

export const Authenticated = createAction(
   '[auth] Authenticated',
   props<{
      userId: string,
      userName: string,
      token: string,
      expiresIn: number,
   }>(),
);