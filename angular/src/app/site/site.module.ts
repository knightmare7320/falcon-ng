import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from "../shared/shared.module";

import { SiteRoutingModule } from './site-routing.module';
import { reducer } from './store/site.reducer';
import { SiteEffects } from './store/site.effects';

import { SiteComponent } from './site.component';
import { SiteInfoComponent } from './site-info/site-info.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { MapLayerSitesService } from '../map/map-sites.service';
import { MapLayerSectorsService } from '../map/map-sectors.service';

@NgModule({
   declarations: [
      SiteComponent,
      SiteInfoComponent,
      SiteMapComponent
   ],
   imports: [
      CommonModule,
      SiteRoutingModule,
      AngularMaterialModule,
      RouterModule,
      SharedModule,
      StoreModule.forFeature('site', reducer),
      EffectsModule.forFeature([
         SiteEffects,
      ]),
   ],
   providers: [
      MapLayerSitesService,
      MapLayerSectorsService,
   ]
})
export default class BrowseModule{};