import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { first, mergeMap } from "rxjs";

import * as fromAuth from "./store/auth.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(
      private store: Store<fromAuth.FeatureState>,
   ) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.store.select(fromAuth.getToken).pipe(
         first(),
         mergeMap(token => {
         const authRequest = !!token ? req.clone({
            setHeaders: { Authorization: 'Bearer ' + token},
         }) : req;
         return next.handle(authRequest);
         })
      );
   }
}