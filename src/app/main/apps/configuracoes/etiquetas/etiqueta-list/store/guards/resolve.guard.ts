import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {EtiquetaListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getEtiquetaListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<EtiquetaListAppState>,
        public _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getEtiquetas().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Etiquetas
     *
     * @returns
     */
    getEtiquetas(): any {
        return this._store.pipe(
            select(getEtiquetaListLoaded),
            tap((loaded: any) => {
                if (this._loginService.getUserProfile() && this._loginService.getUserProfile().id != loaded.value) {
                    const params = {
                        filter: {
                            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetEtiquetas(params));
                }
            }),
            filter((loaded: any) => this._loginService.getUserProfile().id == loaded.value),
            take(1)
        );
    }
}
