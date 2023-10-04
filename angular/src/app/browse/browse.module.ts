import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";

import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from "../shared/shared.module";

import { BrowseRoutingModule } from './browse-routing.module';
import { reducer as browseReducer } from './store/browse.reducer';
import { RegionsEffects } from './regions/store/regions.effects';

import { BrowseComponent } from './browse.component';
import { RegionsComponent } from './regions/regions.component';

@NgModule({
   declarations: [
      BrowseComponent,
      RegionsComponent,
   ],
   imports: [
      CommonModule,
      BrowseRoutingModule,
      AngularMaterialModule,
      SharedModule,
      StoreModule.forFeature('browse', browseReducer),
      EffectsModule.forFeature([
         RegionsEffects,
      ])
   ]
})
export default class BrowseModule{};