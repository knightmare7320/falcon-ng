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

import { RegionsComponent } from './regions/regions.component';
import { L4MarketsComponent } from './l4-markets/l4-markets.component';
import { L5MarketsComponent } from './l5-markets/l5-markets.component';
import { OrgClustersComponent } from './org-clusters/org-clusters.component';
import { L4MarketsEffects } from './l4-markets/store/l4-markets.effects';
import { L5MarketsEffects } from './l5-markets/store/l5-markets.effects';
import { OrgClustersEffects } from './org-clusters/store/org-clusters.effects';

@NgModule({
   declarations: [
      RegionsComponent,
      L4MarketsComponent,
      L5MarketsComponent,
      OrgClustersComponent,
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
         L5MarketsEffects,
         OrgClustersEffects,
      ])
   ]
})
export default class BrowseModule{};