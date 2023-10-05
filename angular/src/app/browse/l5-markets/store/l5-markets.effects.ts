import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { L5MarketsService } from "./l5-markets.service";
import * as fromPage from "./l5-markets.reducer";
import * as PageActions from "./l5-markets.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { L5MarketPerf } from "./l5-markets.model";

@Injectable()
export class L5MarketsEffects {
   constructor(
      private actions$: Actions,
      private service: L5MarketsService,
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
            return this.service.getPerf(state.browse.l5Markets.l4_market_id, state.browse.l5Markets.page_number, state.global.page_size, state.global.order_by, state.global.order_dir, state.global.filter_string);
         }),
         map((response: { region_id:string, l4_market_name: string, total_rows: number, rows: L5MarketPerf[] }) => {
            return PageActions.setPerf({
               region_id: response.region_id,
               l4_market_name: response.l4_market_name,
               total_row_count: response.total_rows,
               rows: response.rows,
            });
         }),
      )
   );

}