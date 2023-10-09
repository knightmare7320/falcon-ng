import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
   selector: 'app-site',
   templateUrl: './site.component.html',
   styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit {
   private routeListener: Subscription | undefined;
   
   cascade_code: string | null = "";
   

   constructor(
      private route: ActivatedRoute,
      // private store: Store<fromPage.FeatureState>,
      // private titleService: Title,
   ) { }

   ngOnInit(): void {
      this.routeListener = this.route.paramMap.subscribe(
         (params: ParamMap) => {
            this.cascade_code = params.get("cascade_code");
            // const region_id = params.get("region_id");
            // if(region_id) {
            //    this.store.dispatch(PageActions.fetchPerf({region_id}));
            // }
         }
      );
   }
}