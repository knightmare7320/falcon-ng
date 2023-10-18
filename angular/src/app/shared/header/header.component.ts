import { Component, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
   @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
   isAuthenticated = false;
   userName: string = 'Guest';

   constructor(
   ) {}

   onToggleSidebar() {
      this.toggleSidebar.emit();
   }

   onLogin() {
      // dispatch open login window
   }

   onLogout() {
      // dispatch logout
   }
}