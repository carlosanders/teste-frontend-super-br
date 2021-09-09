import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

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
        return this.getNumerosUnicosDocumentos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get NumerosUnicosDocumentos
     *
     * @returns
     */
    getNumerosUnicosDocumentos(): any {
        let setorId: number;
        let handle: string;
        handle = 'unidadeHandle';
        if (this.routerState.params['setorHandle']) {
            setorId = this.routerState.params['setorHandle'];
            handle = 'setorHandle';
        } else if (this.routerState.params['unidadeHandle']) {
            setorId = this.routerState.params['unidadeHandle'];
        } else {
            setorId = this.routerState.params['entidadeHandle'];
        }

        return this._store.pipe(
            select(getNumeroUnicoDocumentoListLoaded),
            tap((loaded: any) => {
                if (!loaded || handle !== loaded.id || setorId !== loaded.value) {

                    const params = {
                        filter: {
                            'setor.id': 'eq:' + setorId
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'tipoDocumento.especieDocumento'
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    this._store.dispatch(new fromStore.GetNumerosUnicosDocumentos(params));
                }
            }),
            filter((loaded: any) => loaded && handle === loaded.id && setorId === loaded.value),
            take(1)
        );
    }
}
