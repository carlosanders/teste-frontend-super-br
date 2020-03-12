import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {NumeroUnicoDocumentoListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getNumeroUnicoDocumentoListLoaded} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<NumeroUnicoDocumentoListAppState>
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
        return this.getNumerosUnicosDocumentos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get NumerosUnicosDocumentos
     *
     * @returns {Observable<any>}
     */
    getNumerosUnicosDocumentos(): any {
        return this._store.pipe(
            select(getNumeroUnicoDocumentoListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['setorHandle'] !== loaded.value) {

                    const params = {
                        filter: {
                            'setor.unidade.id': 'eq:' + this.routerState.params.unidadeHandle,
                            'setor.id':'eq:' + this.routerState.params.setorHandle
                        },
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'tipoDocumento.especieDocumento'
                        ],
                        context: {
                            'isAdmin': true
                        }
                    };

                    this._store.dispatch(new fromStore.GetNumerosUnicosDocumentos(params));
                }
            }),
            filter((loaded: any) => {
                return loaded.id === 'setorHandle' && this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}
