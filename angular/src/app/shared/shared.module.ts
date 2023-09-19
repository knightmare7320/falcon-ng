import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

// import { HeaderComponent } from './header/header.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularMaterialModule } from "../angular-material.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { Spinner } from './spinner/spinner.component';

@NgModule({
   declarations: [
      // HeaderComponent,
      // SidebarComponent,
      NotFoundComponent,
      Spinner,
   ],
   imports: [
      CommonModule,
      RouterModule,
      AngularMaterialModule,
      ReactiveFormsModule, 
   ],
   exports: [
      // HeaderComponent,
      // SidebarComponent,
      NotFoundComponent,
      Spinner,
   ]
})

export class SharedModule {}