import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DadosBasicosAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {SetSteps} from '../../../../store/actions';
import {getProcessoLoaded} from '../../../../store/selectors';
import {
    getAssuntosLoaded,
    getInteressadosLoaded,
    getVinculacoesProcessosLoaded,
    getJuntadaLoaded
} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DadosBasicosAppState>} _store
     */
    constructor(
        private _store: Store<DadosBasicosAppState>
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
            this.getProcesso(),
            this.getAssuntos(),
            this.getInteressados(),
            this.getJuntadas(),
            this.getVinculacoesProcessos()
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }
 
    /**
     * Get Processo
     *
     * @returns {Observable<any>}
     */
    getProcesso(): any {
        this._store.dispatch(new SetSteps({steps: true}));

        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['processoHandle'] === 'criar' ) {
                        this._store.dispatch(new fromStore.CreateProcesso());
                    } else {
                        this._store.dispatch(new fromStore.SetProcesso({
                            id: 'processoHandle',
                            value: this.routerState.params['processoHandle']
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
                    filter: {'processo.id': `eq:${this.routerState.params['processoHandle']}`},
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
                            'processo.id': `eq:${this.routerState.params['processoHandle']}`
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
     * Get Juntadas
     *
     * @returns {Observable<any>}
     */
    getJuntadas(): any {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));

        return this._store.pipe(
            select(getJuntadaLoaded),
            tap((loaded: any) => {
                const params = {
                    filter: {
                        'volume.processo.id': `eq:${this.routerState.params['processoHandle']}`
                    },
                    gridFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {numeracaoSequencial: 'DESC'},
                    populate: [
                        'documento',
                        'documento.tipoDocumento'
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
