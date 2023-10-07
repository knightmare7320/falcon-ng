import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { OrgClustersService } from "./org-clusters.service";
import * as fromPage from "./org-clusters.reducer";
import * as PageActions from "./org-clusters.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { OrgClusterPerf } from "./org-cluster.model";

@Injectable()
export class OrgClustersEffects {
   constructor(
      private actions$: Actions,
      private service: OrgClustersService,
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
            return this.service.getPerf(state.browse.orgClusters.group_id, state.browse.orgClusters.page_number, state.global.page_size, state.global.order_by, state.global.order_dir, state.global.filter_string);
         }),
         map((response: { parent_id:string, parent_name: string, group_id: string, group_name: string, total_row_count: number, rows: OrgClusterPerf[] }) => {
            return PageActions.setPerf({
               parent_id: response.parent_id,
               parent_name: response.parent_name,
               group_id: response.group_id,
               group_name: response.group_name,
               total_row_count: response.total_row_count,
               rows: response.rows,
            });
         }),
      )
   );

}