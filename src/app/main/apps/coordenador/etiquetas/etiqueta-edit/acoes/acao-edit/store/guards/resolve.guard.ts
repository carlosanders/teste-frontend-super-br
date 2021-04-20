import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {AcaoEditAppState} from '../reducers';
import * as fromStore from '../index';
import {getHasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {getModalidadeAcaoEtiquetaListLoaded} from "../selectors/modalidade-acao-etiqueta.selectors";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<AcaoEditAppState>} _store
     */
    constructor(
        private _store: Store<AcaoEditAppState>
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
        return forkJoin([
            this.getAcao(),
            this.getModalidadeAcaoEtiqueta(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Acao
     *
     * @returns {Observable<any>}
     */
    getAcao(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['acaoHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateAcao());
                    } else {
                        this._store.dispatch(new fromStore.GetAcao({
                            id: 'eq:' + this.routerState.params['acaoHandle']
                        }));
                    }

                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * @returns {Observable<any>}
     */
    getModalidadeAcaoEtiqueta(): any {
        return this._store.pipe(
            select(getModalidadeAcaoEtiquetaListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    const params = {
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'modalidadeEtiqueta'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetModalidadesAcaoEtiqueta(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}
