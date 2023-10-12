import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { MapComponent } from "./map.component";

const routes: Routes = [
   { path: "", component: MapComponent, title: 'Falcon - Map'},
]

@NgModule({
   imports: [
      RouterModule.forChild(routes),
   ],
   providers: [
      AuthGuard
   ],
})
export class MapRoutingModule {}