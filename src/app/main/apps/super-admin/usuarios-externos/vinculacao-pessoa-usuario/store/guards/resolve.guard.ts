import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {VinculacaoPessoaUsuarioAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedVinculacaoPessoaUsuario} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {getVinculacaoPessoaUsuarioListLoaded} from '../../vinculacao-pessoa-usuario-list/store/selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _router
     * @param _store
     */
    constructor(
        private _router: Router,
        private _store: Store<VinculacaoPessoaUsuarioAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        debugger
        return this.getVinculacaoPessoaUsuario().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }


    /**
     * Get VinculacaoPessoaUsuario
     *
     * @returns {Observable<any>}
     */
    getVinculacaoPessoaUsuario(): Observable<any> {
        return this._store.pipe(
            select(getVinculacaoPessoaUsuarioListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['usuariosExternosHandler'] !== loaded.value) {
                    const params = {
                        filter: {
                            'usuarioVinculado.id': 'eq:'+ this.routerState.params.usuariosExternosHandler
                        },
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                    };

                    this._store.dispatch(new fromStore.GetVinculacaoPessoaUsuario(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }
}
