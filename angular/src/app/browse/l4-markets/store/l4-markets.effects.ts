import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";

import { L4MarketsService } from "./l4-markets.service";
import * as fromPage from "./l4-markets.reducer";
import * as PageActions from "./l4-markets.actions";
import * as GlobalActions from "../../../store/global/global.actions";
import { L4MarketPerf } from "./l4-markets.model";

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
            return this.service.getPerf(state.browse.l4Markets.regionId, state.browse.l4Markets.pageNumber, state.global.pageSize, state.global.orderBy, state.global.orderDir, state.global.filterString);
         }),
         map((response: { region_name: string, total_rows: number, rows: L4MarketPerf[] }) => {
            return PageActions.setPerf({
               regionName: response.region_name,
               totalRows: response.total_rows,
               rows: response.rows,
            });
         }),
      )
   );

}