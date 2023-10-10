import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Title } from '@angular/platform-browser';

import * as fromPage from "./store/site.reducer";
import * as PageActions from "./store/site.actions";
import { Site, Bts, Sector, Carrier } from './store/site.model';

@Component({
   selector: 'app-site',
   templateUrl: './site.component.html',
   styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit, OnDestroy {
   private routeListener: Subscription | undefined;
   private storeListener: Subscription | undefined;
   
   is_loading = false;
   cascade_code: string | null = "";
   site: Site = {} as Site;
   bts: Bts[] = [] as Bts[];
   sectors: Sector[] = [] as Sector[];
   carriers: Carrier[] = [] as Carrier[];   

   constructor(
      private route: ActivatedRoute,
      private store: Store<fromPage.FeatureState>,
      private titleService: Title,
   ) { }

   ngOnInit(): void {
      this.storeListener = this.store.select('site').subscribe(
         (state) => {
            this.is_loading = (state.load_count > 0);
            this.site = state.site;
            this.bts = state.bts;
            this.sectors = state.sectors;
            this.carriers = state.carriers;
         }
      );

      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            this.cascade_code = params.get("cascade_code");
            if(this.cascade_code) {
               this.titleService.setTitle("Falcon - " + this.cascade_code);
               this.store.dispatch(PageActions.fetchSite({cascade_code: this.cascade_code}));
               this.store.dispatch(PageActions.fetchBts({cascade_code: this.cascade_code}));
               this.store.dispatch(PageActions.fetchSectors({cascade_code: this.cascade_code}));
               this.store.dispatch(PageActions.fetchCarriers({cascade_code: this.cascade_code}));
            }
         }
      );
   }
   ngOnDestroy(): void {
      this.routeListener?.unsubscribe();
      this.storeListener?.unsubscribe();
   }
}