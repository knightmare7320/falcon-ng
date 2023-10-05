import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from "../shared/shared.module";

import { BrowseRoutingModule } from './browse-routing.module';
import { reducer as browseReducer } from './store/browse.reducer';
import { RegionsEffects } from './regions/store/regions.effects';

import { BrowseComponent } from './browse.component';
import { RegionsComponent } from './regions/regions.component';
import { L4MarketsComponent } from './l4-markets/l4-markets.component';
import { L4MarketsEffects } from './l4-markets/store/l4-markets.effects';

@NgModule({
   declarations: [
      BrowseComponent,
      RegionsComponent,
      L4MarketsComponent,
   ],
   imports: [
      CommonModule,
      BrowseRoutingModule,
      AngularMaterialModule,
      RouterModule,
      SharedModule,
      StoreModule.forFeature('browse', browseReducer),
      EffectsModule.forFeature([
         RegionsEffects,
         L4MarketsEffects,
      ])
   ]
})
export default class BrowseModule{};