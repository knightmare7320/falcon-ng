import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Title } from '@angular/platform-browser';
import { Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

import * as fromPage from "./store/l4-markets.reducer";
import * as PageActions from "./store/l4-markets.actions";
import * as GlobalActions from "../../store/global/global.actions";

import { L4MarketPerf } from './store/l4-market.model';

@Component({
   selector: 'app-l4-markets',
   templateUrl: './l4-markets.component.html',
   styleUrls: ['./l4-markets.component.scss']
})
export class L4MarketsComponent implements OnInit {
   private routeListener: Subscription | undefined;
   private storeListener: Subscription | undefined;
   is_loading = false;
   total_row_count = 0;
   page_size = 10;
   page_number = 1;
   page_options = [10, 25, 50];

   perf_rows: L4MarketPerf[] = [];
   group_id = "";
   group_name = "";
   
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
            this.is_loading      = (state.browse.l4Markets.status === "loading");
            this.group_id        = state.browse.l4Markets.group_id;
            this.group_name      = state.browse.l4Markets.group_name;
            this.total_row_count = state.browse.l4Markets.total_row_count;
            this.perf_rows = state.browse.l4Markets.perf_rows;
            this.page_size = state.global.page_size;
            this.page_number = state.browse.l4Markets.page_number;
            this.titleService.setTitle(`Falcon Region - ${this.group_name}`);
         }
      );

      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            const region_id = params.get("region_id");
            if(region_id) {
               this.store.dispatch(PageActions.fetchPerf({region_id}));
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