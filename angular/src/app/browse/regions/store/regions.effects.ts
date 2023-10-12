import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, tap, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

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
   ) { }

   fetchHosts = createEffect(
      () => this.actions$.pipe(
         ofType(
            PageActions.fetchPerf,
            PageActions.setPageNumber,
            GlobalActions.setSort,
            GlobalActions.setPageSize,
            GlobalActions.setFilterString,
         ),
         withLatestFrom(
            this.store //.select('orchestration', 'hosts')
         ),
         switchMap(([action, state]) => {
            return this.service.getPerf(state.browse.regions.page_number, state.global.page_size, state.global.order_by, state.global.order_dir, state.global.filter_string);
         }),
         map((response: { total_row_count: number, rows: RegionPerf[] }) => {
            return PageActions.setPerf({
               total_row_count: response.total_row_count,
               rows: response.rows,
            });
         }),
      )
   );

}