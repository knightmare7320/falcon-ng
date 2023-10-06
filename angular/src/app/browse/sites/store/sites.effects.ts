import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { SitesService } from "./sites.service";
import * as fromPage from "./sites.reducer";
import * as PageActions from "./sites.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { SitePerf } from "./site.model";

@Injectable()
export class SitesEffects {
   constructor(
      private actions$: Actions,
      private service: SitesService,
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
            return this.service.getPerf(state.browse.sites.group_type, state.browse.sites.group_id, state.browse.sites.page_number, state.global.page_size, state.global.order_by, state.global.order_dir, state.global.filter_string);
         }),
         map((response: { total_row_count: number, rows: SitePerf[] }) => {
            return PageActions.setPerf({
               total_row_count: response.total_row_count,
               rows: response.rows,
            });
         }),
      )
   );

}