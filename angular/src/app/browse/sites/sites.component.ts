import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Title } from '@angular/platform-browser';
import { Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

import * as fromPage from "./store/sites.reducer";
import * as PageActions from "./store/sites.actions";
import * as GlobalActions from "../../store/global/global.actions";

import { SitePerf } from './store/site.model';

@Component({
   selector: 'app-sites',
   templateUrl: './sites.component.html',
   styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
   private routeListener: Subscription | undefined;
   private storeListener: Subscription | undefined;
   parent_id = '';
   parent_name = '';
   group_id = '';
   group_type = '';
   group_name = '';
   is_loading = false;
   total_row_count = 0;
   page_size = 10;
   page_number = 1;
   page_options = [10, 25, 50];

   perf_rows: SitePerf[] = [];
   l4_market_id = "";
   l5_market_name = "";
   
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
            this.is_loading      = (state.browse.sites.status === "loading");
            this.parent_id       = state.browse.sites.parent_id;
            this.parent_name     = state.browse.sites.parent_name;
            this.group_name      = state.browse.sites.group_name;
            this.group_type      = state.browse.sites.group_type;
            this.group_id        = state.browse.sites.group_id;
            this.total_row_count = state.browse.sites.total_row_count;
            this.perf_rows       = state.browse.sites.perf_rows;
            this.page_size       = state.global.page_size;
            this.page_number     = state.browse.orgClusters.page_number;
            if (this.group_type === 'org_cluster_id')
               this.titleService.setTitle(`Falcon Org Cluster: ${this.group_name}`);
            else
               this.titleService.setTitle(`Falcon Sites`);
         }
      );

      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            if (params.has('org_cluster_id')) {
               const group_type = 'org_cluster_id';
               const group_id = params.get('org_cluster_id');
               if(group_type && group_id) {
                  this.store.dispatch(PageActions.fetchPerf({group_type, group_id}));
               }   
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