import { NgModule } from "@angular/core";

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
   exports: [
      MatTabsModule,
      MatCardModule,
      MatSnackBarModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTooltipModule,
      MatGridListModule,
   ]
})
export class AngularMaterialModule {}