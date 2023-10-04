import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, tap, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { RegionsService } from "./regions.service";
import * as fromPage from "./regions.reducer";
import * as PageActions from "./regions.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { RegionPerf } from "./regions.model";

@Injectable()
export class RegionsEffects {
   constructor(
      private actions$: Actions,
      private service: RegionsService,
      private store: Store<fromPage.FeatureState>,
      private router: Router,
   ) { }

   fetchHosts = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchRegionPerf,
            PageActions.setPageNumber,
            GlobalActions.setSort,
            GlobalActions.setPageSize,
            GlobalActions.setFilterString,
         ),
         withLatestFrom(
            this.store //.select('orchestration', 'hosts')
         ),
         switchMap(([action, state]) => {
            return this.service.getRegionPerf(state.browse.regions.pageNumber, state.global.pageSize, state.global.orderBy, state.global.orderDir, state.global.filterString);
         }),
         map((response: { total_rows: number, rows: RegionPerf[] }) => {
            return PageActions.setRegionPerf({
               totalRows: response.total_rows,
               rows: response.rows,
            });
         }),
      )
   );

}