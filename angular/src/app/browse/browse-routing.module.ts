import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { BrowseComponent } from "./browse.component";

const routes: Routes = [
   { path: "", component: BrowseComponent },
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