import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as AuthActions from './auth.actions';
// import { Observable, timer } from 'rxjs';

@Injectable()
export class AuthEffects {
   constructor(
      private actions$: Actions,
      private authService: AuthService,
   ) { }

   // tokenTimer: any;

   // authLogin$ = createEffect(() => this.actions$.pipe(
   //    ofType(
   //       AuthActions.Login
   //    ),
   //    switchMap((action) => {
   //       return this.authService.login(action.username, action.password);
   //    }),
   //    map((response: { status: string, message?: string, userId?: string, userName?: string, token?: string, expiresIn: number }) => {
   //       if (response.token)
   //          return AuthActions.Authenticated({
   //             userId: response.userId,
   //             userName: response.userName,
   //             token: response.token,
   //             expiresIn: response.expiresIn,
   //          });
   //       else
   //          return;
   //    }),
   // ));

   authenticatedTimer$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            AuthActions.Authenticated
         ),
         map(action => {
            this.authService.setAuthenticated(action.userId, action.userName, action.token, action.expiresIn);
         })
      ),
      { dispatch: false }
   );
   
   authLogout$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            AuthActions.Logout
         ),
         map(action => {
            this.authService.logout();
         })
      ),
      { dispatch: false }
   );
}