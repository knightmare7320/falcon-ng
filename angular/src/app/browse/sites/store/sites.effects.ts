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
         map((response: { group_type: string, group_id: string, group_name: string, parent_id: string, parent_name: string, total_row_count: number, rows: SitePerf[] }) => {
            return PageActions.setPerf({
               group_type: response.group_type,
               group_id: response.group_id,
               group_name: response.group_name,
               parent_id: response.parent_id,
               parent_name: response.parent_name, 
               total_row_count: response.total_row_count,
               rows: response.rows,
            });
         }),
      )
   );

}