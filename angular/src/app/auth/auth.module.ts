import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
   declarations: [
      LoginComponent,
   ],
   imports: [
      CommonModule,
      FormsModule,
      AngularMaterialModule,
   ],
   exports: [
      LoginComponent,
   ]
})
export class AuthModule {}