import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { L4MarketsService } from "./l4-markets.service";
import * as fromPage from "./l4-markets.reducer";
import * as PageActions from "./l4-markets.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { L4MarketPerf } from "./l4-market.model";

@Injectable()
export class L4MarketsEffects {
   constructor(
      private actions$: Actions,
      private service: L4MarketsService,
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
            return this.service.getPerf(state.browse.l4Markets.group_id, state.browse.l4Markets.page_number, state.global.page_size, state.global.order_by, state.global.order_dir, state.global.filter_string);
         }),
         map((response: { group_id: string, group_name: string, total_row_count: number, rows: L4MarketPerf[] }) => {
            return PageActions.setPerf({
               group_id: response.group_id,
               group_name: response.group_name,
               total_row_count: response.total_row_count,
               rows: response.rows,
            });
         }),
      )
   );

}