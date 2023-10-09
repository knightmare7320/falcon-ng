import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { SiteComponent } from "./site.component";

const routes: Routes = [
   { path: ":cascade_code", component: SiteComponent, title: 'Falcon - Site'},
]

@NgModule({
   imports: [
      RouterModule.forChild(routes),
   ],
   providers: [
      AuthGuard
   ],
})
export class SiteRoutingModule {}