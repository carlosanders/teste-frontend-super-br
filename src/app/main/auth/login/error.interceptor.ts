import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import * as fromStore from 'app/main/auth/login/store';
import {Store} from '@ngrx/store';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@cdk/angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private store: Store<fromStore.LoginState>,
        private snackBar: MatSnackBar
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if (err.status !== 401 && err.status !== 422) {
                const error = err.error.message || err.statusText || 'Erro desconhecido!';
                this.snackBar.open(error, 'Fechar', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    panelClass: ['danger-snackbar'],
                    duration: 30000
                });
            }
            return throwError(err);
        }));
    }
}
