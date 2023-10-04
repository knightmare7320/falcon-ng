import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
// import { BrowseComponent } from "./browse.component";
import { RegionsComponent } from "./regions/regions.component";
import { L4MarketsComponent } from "./l4-markets/l4-markets.component";

const routes: Routes = [
   { path: "", component: RegionsComponent },
   { path: "region/:region_id", component: L4MarketsComponent },
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