import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(private _snackBar: MatSnackBar) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred.';
          if (error.error.message) {
            errorMessage = error.error.message;
          }
         //  alert(errorMessage);
         this._snackBar.open(errorMessage, 'OK');

          return throwError(() => new Error(errorMessage));
        })
      );
   }
}