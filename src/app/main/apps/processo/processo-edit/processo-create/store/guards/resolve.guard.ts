import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {DadosBasicosAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {SetSteps} from '../../../../store';
import {getProcessoLoaded} from '../../store';
import {
    getAssuntosLoaded,
    getConfiguracaoNupLoaded,
    getInteressadosLoaded,
    getJuntadaLoaded,
    getVinculacoesProcessosLoaded
} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<DadosBasicosAppState>
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
        return forkJoin([
            this.getProcesso(),
            this.getAssuntos(),
            this.getInteressados(),
            this.getJuntadas(),
            this.getVinculacoesProcessos(),
            this.getConfiguracaoNup()
        ]).pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        this._store.dispatch(new fromStore.UnloadProcesso());
        this._store.dispatch(new SetSteps({steps: true}));

        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['processoHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateProcesso());
                    } else {
                        this._store.dispatch(new fromStore.GetProcesso({
                            id: this.routerState.params['processoHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get assuntos
     *
     * @returns
     */
    getAssuntos(): any {
        this._store.dispatch(new fromStore.UnloadAssuntos({reset: true}));

        if (this.routerState.params['processoHandle'] === 'criar') {
            return this._store.pipe(take(1));
        }

        return this._store.pipe(
            select(getAssuntosLoaded),
            tap((loaded) => {
                const params = {
                    filter: {'processo.id': `eq:${this.routerState.params['processoHandle']}`},
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['populateAll']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetAssuntos(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get interessados
     *
     * @returns
     */
    getInteressados(): any {
        this._store.dispatch(new fromStore.UnloadInteressados({reset: true}));

        if (this.routerState.params['processoHandle'] === 'criar') {
            return this._store.pipe(take(1));
        }

        return this._store.pipe(
            select(getInteressadosLoaded),
            tap((loaded) => {
                const params = {
                    filter: {'processo.id': `eq:${this.routerState.params['processoHandle']}`},
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['populateAll', 'pessoa']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetInteressados(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get vinculacoesProcessos
     *
     * @returns
     */
    getVinculacoesProcessos(): any {
        this._store.dispatch(new fromStore.UnloadVinculacoesProcessos({reset: true}));

        if (this.routerState.params['processoHandle'] === 'criar') {
            return this._store.pipe(take(1));
        }

        return this._store.pipe(
            select(getVinculacoesProcessosLoaded),
            tap((loaded) => {
                const params = {
                    filter: {
                        'processo.id': `eq:${this.routerState.params['processoHandle']}`
                    },
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: ['populateAll', 'modalidadeVinculacaoProcesso', 'processo', 'processoVinculado']
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetVinculacoesProcessos(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Juntadas
     *
     * @returns
     */
    getJuntadas(): any {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));

        if (this.routerState.params['processoHandle'] === 'criar') {
            return this._store.pipe(take(1));
        }

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
                        'documento.componentesDigitais',
                        'documento.tipoDocumento',
                        'documento.vinculacoesDocumentos',
                        'documento.vinculacaoDocumentoPrincipal'
                    ]
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetJuntadas(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get configuracaoNup
     *
     * @returns
     */
    getConfiguracaoNup(): any {
        this._store.dispatch(new fromStore.UnloadConfiguracoesNup({reset: true}));

        return this._store.pipe(
            select(getConfiguracaoNupLoaded),
            tap((loaded) => {
                const params = {
                    filter: {
                        'dataHoraFimVigencia': 'isNull'
                    },
                    sort: {},
                    limit: 10,
                    offset: 0,
                    populate: []
                };

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetConfiguracoesNup(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}
