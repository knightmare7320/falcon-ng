import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RegionsComponent } from "./regions/regions.component";
import { L4MarketsComponent } from "./l4-markets/l4-markets.component";
import { L5MarketsComponent } from "./l5-markets/l5-markets.component";

const routes: Routes = [
   { path: ""                       , component: RegionsComponent  , title: 'Falcon - National'},
   { path: "region/:region_id"      , component: L4MarketsComponent, title: 'Falcon - Region' },
   { path: "l4_market/:l4_market_id", component: L5MarketsComponent, title: 'Falcon - L4 Market' },
]

@NgModule({
   imports: [
      RouterModule.forChild(routes),
   ],
   providers: [
      AuthGuard
   ],
})
export class BrowseRoutingModule {}