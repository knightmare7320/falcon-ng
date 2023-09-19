import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromAuth from "./store/auth.reducer";

@Injectable()
export class AuthGuard  {
   constructor(
      private store: Store<fromAuth.FeatureState>,
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.store.select(fromAuth.getIsAuthenticated);;
   }
}