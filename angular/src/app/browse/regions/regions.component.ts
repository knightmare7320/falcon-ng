import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

import * as fromPage from "./store/regions.reducer";
import * as PageActions from "./store/regions.actions";
import * as GlobalActions from "../../store/global/global.actions";

import { RegionPerf } from './store/regions.model';

@Component({
   selector: 'app-regions',
   templateUrl: './regions.component.html',
   styleUrls: [ './regions.component.scss' ],
})
export class RegionsComponent {
   private subscription: Subscription | undefined;
   is_loading = false;
   total_row_count = 0;
   perf_rows: RegionPerf[] = [];
   page_size = 10;
   page_number = 1;
   page_options = [10, 25, 50];

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
      private store: Store<fromPage.FeatureState>,
   ) { }

   ngOnInit(): void {
      this.subscription = this.store.subscribe(
         (state) => {
            this.is_loading = (state.browse.regions.status === "loading");
            this.total_row_count = state.browse.regions.total_row_count;
            this.perf_rows = state.browse.regions.perf_rows;
            this.page_size = state.global.page_size;
            this.page_number = state.browse.regions.page_number;
        }
      );
      this.store.dispatch(PageActions.fetchPerf());
   }

   ngOnDestroy(): void {
      if (this.subscription)
         this.subscription.unsubscribe();
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