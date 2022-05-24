import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromLoginStore from 'app/main/auth/login/store';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    constructor(
        private _store: Store<fromLoginStore.LoginAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
    }

    canActivate(): Observable<boolean> {
        return this.validateTokenPayload().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                return of(false);
            })
        );
    }

    validateTokenPayload(): Observable<any> {
        return this._store.pipe(
            select(fromLoginStore.getToken),
            tap((token: any) => {
                if (token && this._loginService.getTokenPayload(token)?.passwordExpired) {
                    return of(true);
                } else {
                    this._router.navigate(['app/main/auth/login']).then();
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}
