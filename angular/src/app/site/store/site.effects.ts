import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { SiteService } from "./site.service";
import * as fromPage from "./site.reducer";
import * as PageActions from "./site.actions";
import { Site, Bts, Sector, Carrier } from "./site.model";

@Injectable()
export class SiteEffects {
   constructor(
      private actions$: Actions,
      private service: SiteService,
      private store: Store<fromPage.FeatureState>,
   ) { }

   fetchSite$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchSite,
         ),
         withLatestFrom(
            this.store.select('site')
         ),
         switchMap(([action, state]) => {
            return this.service.getSite(state.cascade_code);
         }),
         map((site: Site ) => {
            return PageActions.setSite({
               site
            });
         }),
      )
   );

   fetchBts$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchBts,
         ),
         withLatestFrom(
            this.store.select('site')
         ),
         switchMap(([action, state]) => {
            return this.service.getBts(state.cascade_code);
         }),
         map((bts: Bts[] ) => {
            return PageActions.setBts({
               bts
            });
         }),
      )
   );

   fetchSectors$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchSectors,
         ),
         withLatestFrom(
            this.store.select('site')
         ),
         switchMap(([action, state]) => {
            return this.service.getSectors(state.cascade_code);
         }),
         map((sectors: Sector[] ) => {
            return PageActions.setSectors({
               sectors
            });
         }),
      )
   );

   fetchCarriers$ = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchCarriers,
         ),
         withLatestFrom(
            this.store.select('site')
         ),
         switchMap(([action, state]) => {
            return this.service.getCarriers(state.cascade_code);
         }),
         map((carriers: Carrier[] ) => {
            return PageActions.setCarriers({
               carriers
            });
         }),
      )
   );
}