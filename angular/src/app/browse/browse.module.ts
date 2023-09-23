import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse.component';
import { StoreModule } from "@ngrx/store";
// import { EffectsModule } from "@ngrx/effects";

import { BrowseRoutingModule } from './browse-routing.module';
import { reducer as browseReducer } from './store/browse.reducer';

@NgModule({
   declarations: [
      BrowseComponent,
   ],
   imports: [
      BrowseRoutingModule,
      StoreModule.forFeature('browse', browseReducer),
      // EffectsModule.forFeature([
      //    BrowseEffects,
      // ])
   ]
})
export default class BrowseModule{};