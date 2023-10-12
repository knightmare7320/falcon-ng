import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from "../shared/shared.module";

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

@NgModule({
   declarations: [
      MapComponent,
   ],
   imports: [
      MapRoutingModule,
      CommonModule,
      AngularMaterialModule,
      RouterModule,
      SharedModule,
   ]
})
export default class BrowseModule{};