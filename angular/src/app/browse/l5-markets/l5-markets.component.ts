import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Title } from '@angular/platform-browser';
import { Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

import * as fromPage from "./store/l5-markets.reducer";
import * as PageActions from "./store/l5-markets.actions";
import * as GlobalActions from "../../store/global/global.actions";

import { L5MarketPerf } from './store/l5-market.model';

@Component({
   selector: 'app-l5-markets',
   templateUrl: './l5-markets.component.html',
   styleUrls: ['./l5-markets.component.scss']
})
export class L5MarketsComponent implements OnInit {
   private routeListener: Subscription | undefined;
   private storeListener: Subscription | undefined;
   is_loading = false;
   total_row_count = 0;
   page_size = 10;
   page_number = 1;
   page_options = [10, 25, 50];

   perf_rows: L5MarketPerf[] = [];
   region_id = "";
   l4_market_name = "";
   
   displayed_columns: string[] = [
      'name',
      'setup_attempts',
      'equipment_blocks',
      'access_failures',
      'successful_calls',
      'primary_drops',
      'primary_erlangs',
   ];

   constructor(
      private route: ActivatedRoute,
      private store: Store<fromPage.FeatureState>,
      private titleService: Title,
   ) { }

   ngOnInit(): void {
      this.storeListener = this.store.subscribe(
         (state) => {
            this.is_loading      = (state.browse.l5Markets.status === "loading");
            this.region_id       = state.browse.l5Markets.region_id;
            this.l4_market_name  = state.browse.l5Markets.l4_market_name;
            this.total_row_count = state.browse.l5Markets.total_row_count;
            this.perf_rows       = state.browse.l5Markets.perf_rows;
            this.page_size       = state.global.page_size;
            this.page_number     = state.browse.l5Markets.page_number;
            this.titleService.setTitle(`Falcon L4 Market - ${this.l4_market_name}`);
         }
      );

      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            const l4_market_id = params.get('l4_market_id');
            if(l4_market_id) {
               this.store.dispatch(PageActions.fetchPerf({l4_market_id}));
            }
         }
      );
   }

   ngOnDestroy(): void {
      if (this.routeListener)
         this.routeListener.unsubscribe();
      if (this.storeListener)
         this.storeListener.unsubscribe();
   }

   onPageChanged(event: PageEvent) {
      if (this.page_number !== event.pageIndex + 1) {
         this.store.dispatch(PageActions.setPageNumber({ page_number: event.pageIndex + 1}));
      }
      if (this.page_size !== event.pageSize) {
         this.store.dispatch(GlobalActions.setPageSize({ page_size: event.pageSize }));
      }
   }

   onSortChanged(event: Sort) {
      this.store.dispatch(GlobalActions.setSort({ order_by: event.active, order_dir: event.direction }));
   }
}