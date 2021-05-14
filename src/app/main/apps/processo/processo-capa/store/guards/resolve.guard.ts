import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessoCapaAppState} from '../reducers';
import * as fromStore from '../index';
import {getProcessoLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {getAcompanhamentoProcessoLoaded,getAssuntosLoaded,getInteressadosLoaded,getVinculacoesProcessosLoaded} from '../index';
import {Usuario} from "@cdk/models";
import {LoginService} from "../../../../../auth/login/login.service";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    processoId: number;

    usuario: Usuario;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<ProcessoCapaAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.usuario = this._loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;

                    this.processoId = this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'];
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
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Check store
     *
     * @returns {Observable<any>}
     */
    checkStore(): Observable<any> {
        return forkJoin([this.getAssuntos(), this.getInteressados(), this.getVinculacoesProcessos()]).pipe(
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
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value || this.processoId !== loaded.value) {
                    this._store.dispatch(new fromStore.GetProcesso({
                        id: this.processoId
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
                    filter: {'processo.id': `eq:${this.processoId}`, 'principal': 'eq:true'},
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
                    filter: {'processo.id': `eq:${this.processoId}`},
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
                    filter: {
                        orX: [
                            {
                                'processo.id': `eq:${this.processoId}`
                            },
                            {
                                'processoVinculado.id':
                                    `eq:${this.processoId}`
                            }
                        ]
                    },
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
     * Get Acompanhamento
     *
     * @returns {Observable<any>}
     */
    getAcompanhamento(): any {
        this._store.dispatch(new fromStore.UnloadAcompanhamento({reset: true}));
        return this._store.pipe(
            select(getAcompanhamentoProcessoLoaded),
            tap(loaded => {
                const params = {
                    filter: {'processo.id': `eq:${this.processoId}`, 'usuario.id': `eq:${this.usuario.id}`},
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['populateAll']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetAcompanhamento(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}


