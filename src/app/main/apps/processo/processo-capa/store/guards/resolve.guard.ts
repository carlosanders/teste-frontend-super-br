import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessoCapaAppState} from '../reducers';
import * as fromStore from '../index';
import {getProcessoLoaded, getJuntadasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<ProcessoCapaAppState>,
        private _router: Router
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
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Check store
     *
     * @returns {Observable<any>}
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.getJuntadas()
        ).pipe(
            filter(([juntadasLoaded]) => !!(juntadasLoaded)),
            take(1),
            switchMap(() =>
                this.getProcesso()
            )
        );
    }

    /**
     * Get Processo
     *
     * @returns {Observable<any>}
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetProcesso({
                        id: `eq:${this.routerState.params['processoHandle']}`
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get folders
     *
     * @returns {Observable<any>}
     */
    getJuntadas(): any {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));

        return this._store.pipe(
            select(getJuntadasLoaded),
            tap(loaded => {
                const params = {
                    filter: {
                        'volume.processo.id': `eq:${this.routerState.params['processoHandle']}`,
                        'vinculada': 'eq:0'
                    },
                    sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
                    limit: 10,
                    offset: 0,
                    populate: [
                        'documento',
                        'documento.tipoDocumento',
                        'documento.componentesDigitais',
                        'documento.vinculacoesDocumentos',
                        'documento.vinculacoesDocumentos.documentoVinculado',
                        'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                        'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais'
                    ]
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetJuntadas(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}


