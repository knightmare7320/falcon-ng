import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

import { reducers } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      AngularMaterialModule,
      SharedModule,
      AuthModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([
         AuthEffects,
      ]),
      StoreDevtoolsModule.instrument({
         maxAge: 25, 
         logOnly: environment.production, 
         autoPause: true, 
      }),
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
