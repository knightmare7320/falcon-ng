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
   isLoading = false;
   totalRows = 0;
   regionPerf: RegionPerf[] = [];
   pageSize = 10;
   pageNumber = 1;
   pageOptions = [10, 25, 50];

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
      private store: Store<fromPage.FeatureState>,
   ) { }

   ngOnInit(): void {
      this.subscription = this.store.subscribe(
         (state) => {
            this.isLoading = (state.browse.regions.status === "loading");
            this.totalRows = state.browse.regions.totalRows;
            this.regionPerf = state.browse.regions.regionPerf;
            this.pageSize = state.global.pageSize;
            this.pageNumber = state.browse.regions.pageNumber;
        }
      );
      this.store.dispatch(PageActions.fetchRegionPerf());
   }

   ngOnDestroy(): void {
      if (this.subscription)
         this.subscription.unsubscribe();
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