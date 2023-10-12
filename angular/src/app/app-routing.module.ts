import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
   { path: "browse", title: "Falcon"       , loadChildren: () => import('./browse/browse.module') },
   { path: "site"  , title: "Falcon - Site", loadChildren: () => import('./site/site.module')},
   { path: "map"   , title: "Falcon - Map" , loadChildren: () => import('./map/map.module')},
   { path: ""             , redirectTo: '/browse', pathMatch: 'full' },
   { path: '**'           , component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
