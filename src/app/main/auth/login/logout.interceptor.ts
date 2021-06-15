import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import * as fromStore from 'app/main/auth/login/store';
import {Logout} from 'app/main/auth/login/store';
import {select, Store} from '@ngrx/store';
import {getRouterState} from '../../../store';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {
    routerState: any;
    constructor(
        private store: Store<fromStore.LoginState>
    ) {
        this.store.pipe(select(getRouterState)).subscribe(state => this.routerState = state?.state);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if (err.status === 401) {
                this.store.dispatch(new Logout({url: this.routerState?.url}));
            }
            return throwError(err);
        }));
    }
}
