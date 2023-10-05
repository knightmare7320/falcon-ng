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

import { L4MarketPerf } from './store/l4-markets.model';

@Component({
   selector: 'app-l4-markets',
   templateUrl: './l4-markets.component.html',
   styleUrls: ['./l4-markets.component.scss']
})
export class L4MarketsComponent implements OnInit {
   private routeListener: Subscription | undefined;
   private storeListener: Subscription | undefined;
   isLoading = false;
   totalRowCount = 0;
   pageSize = 10;
   pageNumber = 1;
   pageOptions = [10, 25, 50];

   perfRows: L4MarketPerf[] = [];
   regionName = "";
   
   displayedColumns: string[] = [
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
            this.isLoading = (state.browse.regions.status === "loading");
            this.regionName = state.browse.l4Markets.regionName;
            this.totalRowCount = state.browse.regions.totalRowCount;
            this.perfRows = state.browse.l4Markets.perfRows;
            this.pageSize = state.global.pageSize;
            this.pageNumber = state.browse.regions.pageNumber;
            this.titleService.setTitle(`Falcon - ${this.regionName} Region`);
         }
      );

      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            const regionId = params.get("region_id");
            if(regionId) {
               this.store.dispatch(PageActions.fetchPerf({regionId}));
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
      if (this.pageNumber !== event.pageIndex) {
         this.store.dispatch(PageActions.setPageNumber({ pageNumber: event.pageIndex }));
      }
      if (this.pageSize !== event.pageSize) {
         this.store.dispatch(GlobalActions.setPageSize({ pageSize: event.pageSize }));
      }
   }

   onSortChanged(event: Sort) {
      this.store.dispatch(GlobalActions.setSort({ orderBy: event.active, orderDir: event.direction }));
   }
}