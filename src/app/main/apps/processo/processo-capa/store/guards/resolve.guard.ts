import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessoCapaAppState} from '../reducers';
import * as fromStore from '../index';
import {getProcessoLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {getAssuntosLoaded, getInteressadosLoaded, getVinculacoesProcessosLoaded, getTarefasLoaded} from '../index';

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
        return forkJoin([this.getAssuntos(), this.getInteressados(), this.getVinculacoesProcessos(), this.getTarefas()]).pipe(
            filter(([loaded]) => !!(loaded)),
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
     * Get assuntos
     *
     * @returns {Observable<any>}
     */
    getAssuntos(): any {
        this._store.dispatch(new fromStore.UnloadAssuntos({reset: true}));

        return this._store.pipe(
            select(getAssuntosLoaded),
            tap(loaded => {
                const params = {
                    filter: {'processo.id': `eq:${this.routerState.params['processoHandle']}`, 'principal': 'eq:true'},
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['assuntoAdministrativo']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetAssuntos(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get interessados
     *
     * @returns {Observable<any>}
     */
    getInteressados(): any {
        this._store.dispatch(new fromStore.UnloadInteressados({reset: true}));

        return this._store.pipe(
            select(getInteressadosLoaded),
            tap(loaded => {
                const params = {
                    filter: {'processo.id': `eq:${this.routerState.params['processoHandle']}`},
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['modalidadeInteressado', 'pessoa']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetInteressados(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get vinculacoesProcessos
     *
     * @returns {Observable<any>}
     */
    getVinculacoesProcessos(): any {
        this._store.dispatch(new fromStore.UnloadVinculacoesProcessos({reset: true}));

        return this._store.pipe(
            select(getVinculacoesProcessosLoaded),
            tap(loaded => {
                const params = {
                    filter: [
                        {
                            'processo.id': `eq:${this.routerState.params['processoHandle']}`,
                            'processoVinculado.id': `eq:${this.routerState.params['processoHandle']}`
                        }
                    ],
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['modalidadeVinculacaoProcesso', 'processo', 'processoVinculado']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetVinculacoesProcessos(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }


    /**
     * Get Tarefas
     *
     * @returns {Observable<any>}
     */
    getTarefas(): any {
        this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));

        return this._store.pipe(
            select(getTarefasLoaded),
            tap(loaded => {
                const params = {
                    filter: [
                        {
                            'processo.id': `eq:${this.routerState.params['processoHandle']}`,
                            'dataHoraConclusaoPrazo': 'isNull'
                        }
                    ],
                    sort: {dataHoraFinalPrazo: 'ASC'},
                    limit: 10,
                    offset: 0,
                    populate: ['processo', 'especieTarefa']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetTarefas(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}


