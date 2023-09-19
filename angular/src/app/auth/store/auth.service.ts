import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from "@ngrx/store";

import { environment } from "src/environments/environment";

import * as fromAuth from "../store/auth.reducer";
import * as AuthActions from "../store/auth.actions";

const BACKEND_URL = environment.apiUrl + "/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {
   constructor(
      private store: Store<fromAuth.FeatureState>,
      private http: HttpClient,
   ) { }

   tokenTimer: any;

   login(username: string, password: string)
      : Observable<{ status: string, message?: string, userId?: string, userName?: string, token?: string, expiresIn?: number }> {
      return this.http.post<{ status: string, message?: string, userId?: string, userName?: string, token?: string, expiresIn?: number }>(
         `${BACKEND_URL}/login`,
         {
            username: username,
            password: password
         },
      );
   }

   setAuthenticated(userId: string, userName: string, token: string, expiresIn: number) {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresIn * 1000);

      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('id-token', token);
      localStorage.setItem('id-token-expiration', expirationDate.toISOString());

      this.tokenTimer = setTimeout(
         () => this.store.dispatch(AuthActions.Logout())
         , expiresIn*1000
      );
   }

   logout() {
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('id-token');
      localStorage.removeItem('id-token-expiration');
      if (this.tokenTimer) {
         clearTimeout(this.tokenTimer);
      }
   }
}