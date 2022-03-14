import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    constructor(
        private _store: Store<fromStore.EspecieDocumentoAvulsoListAppState>,
        private _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getEspecieDocumentoAvulso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    getEspecieDocumentoAvulso(): Observable<any> {
        return this._store.pipe(
            select(fromStore.getEspecieDocumentoAvulsoListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {'generoDocumentoAvulso.nome': `eq:ADMINISTRATIVO`},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                    };
                    this._store.dispatch(new fromStore.GetEspecieDocumentoAvulso(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}
