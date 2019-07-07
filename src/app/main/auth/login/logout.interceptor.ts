import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromStore from 'app/main/auth/login/store';
import {Store} from '@ngrx/store';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<fromStore.LoginState>,
        private loginService: LoginService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // this.store.dispatch(new fromStore.Logout());
                this.loginService.removeToken();
                this.router.navigateByUrl('/auth/login');
            }
            return throwError(err);
        }));
    }
}
