import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store/app.reducer";
import * as AuthActions from "../store/auth.actions";

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   isLoading = false;
   
   constructor(
      private store: Store<fromApp.AppState>,
      ) { }
      
   onLogin(form: NgForm): void {
      const username = form.value.username;
      const password = form.value.password;
      this.store.dispatch(AuthActions.Login({ username, password }));
   }

   onCancel(): void {
      this.store.dispatch(AuthActions.CloseLoginWindow());
   }
}