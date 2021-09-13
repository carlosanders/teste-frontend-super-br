import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getUsuariosExternosListLoaded} from '../';
import {getRouterState} from 'app/store/reducers';
import {UsuariosExternosListAppState} from '../reducers';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<UsuariosExternosListAppState>,
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
        return this.getUsuariosExternosList().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get UsuariosExternos
     *
     * @returns
     */
    getUsuariosExternosList(): Observable<any> {
        return this._store.pipe(
            select(getUsuariosExternosListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {
                            'colaborador.id': 'isNull'
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetUsuariosExternosList(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }

}
