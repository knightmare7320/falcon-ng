import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   drawerOpened = true;

   tokenTimer: any;
   loginVisible = false;
   loggedIn = false;
}
