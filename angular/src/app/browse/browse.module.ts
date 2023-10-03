import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
// import { EffectsModule } from "@ngrx/effects";

import { BrowseRoutingModule } from './browse-routing.module';
import { reducer as browseReducer } from './store/browse.reducer';

import { BrowseComponent } from './browse.component';
import { NationalPageComponent } from './national-page/national-page.component';

@NgModule({
   declarations: [
      BrowseComponent,
      NationalPageComponent,
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