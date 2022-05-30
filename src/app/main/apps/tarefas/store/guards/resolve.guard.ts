import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {TarefasAppState} from 'app/main/apps/tarefas/store/reducers';
import * as fromStore from 'app/main/apps/tarefas/store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {Usuario} from '@cdk/models';

import {navigationConverter} from 'app/navigation/navigation';
import * as moment from 'moment';
import {ViewMode} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';
import {CacheGenericUserDataService} from '@cdk/services/cache.service';
import {TarefasComponent} from '../../tarefas.component';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    loadingTarefas: boolean = false;
    viewMode: ViewMode;
    tarefaSort: any;
    tarefaLimit: number;
    private _profile: Usuario;

    constructor(
        private _store: Store<TarefasAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _cacheGenericUserDataService: CacheGenericUserDataService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.viewMode = this._router.getCurrentNavigation()?.extras?.state?.viewMode ?? this.viewMode;
        });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.getFolders()
        ).pipe(
            filter(([foldersLoaded]) => !!(foldersLoaded)),
            take(1),
            switchMap(() => {
                return this._cacheGenericUserDataService.get(TarefasComponent.definitionsKey)
                    .pipe(
                        tap((configs) => {
                            const scopeKey = TarefasComponent.generateScopeKey([this.routerState?.params['generoHandle']]);
                            if (configs) {
                                const scopeConfigs = {
                                    ...(configs[scopeKey] || {})
                                };
                                // Usar sempre o que veio pelo router
                                if (!this.viewMode) {
                                    this.viewMode = scopeConfigs?.viewMode
                                }
                                this.tarefaSort = scopeConfigs?.tarefaSort;
                                this.tarefaLimit = scopeConfigs?.tarefaLimit;
                            }
                        })
                    )
            }),
            catchError(() => of(true)),
            switchMap(() =>
                this.getTarefas()
            )
        );
    }

    /**
     * Get folders
     *
     * @returns
     */
    getFolders(): any {
        return this._store.pipe(
            select(fromStore.getFoldersLoaded),
            tap((loaded) => {
                if (!loaded) {
                    this._store.dispatch(new fromStore.GetFolders([]));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }

    /**
     * Get Tarefas
     *
     * @returns
     */
    getTarefas(): any {

        return combineLatest(
            [
                this._store.pipe(select(fromStore.getTarefasLoaded)),
                this._store.pipe(select(fromStore.getTarefaHandle)),
                this._store.pipe(select(fromStore.getIsLoading)),
            ]
        ).pipe(
            tap(([loaded, tarefaHandle, loading]) => {
                if (!loading && loaded && this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] + '_' +
                    this.routerState.params['targetHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));

                } else if (!loading && !loaded) {
                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: (this.viewMode === 'grid' ? (this.tarefaLimit || 10) : 10),
                        offset: 0,
                        sort: (this.viewMode === 'grid' ? (this.tarefaSort || {dataHoraFinalPrazo: 'ASC'}) : {dataHoraFinalPrazo: 'ASC'}),
                        populate: [
                            'processo',
                            'colaborador.usuario',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'setor.unidade',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'vinculacaoWorkflow',
                            'vinculacaoWorkflow.workflow',
                        ],
                        context: {}
                    };

                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe((typeParam) => {
                        let tarefaFilter = {};
                        if (this.routerState.params[typeParam] === 'compartilhadas') {
                            tarefaFilter = {
                                'compartilhamentos.usuario.id': 'eq:' + this._profile.id,
                                'dataHoraConclusaoPrazo': 'isNull'
                            };
                        }

                        if (this.routerState.params[typeParam] === 'concluidas') {
                            tarefaFilter = {
                                'usuarioResponsavel.id': 'eq:' + this._profile.id,
                                'dataHoraConclusaoPrazo': 'isNotNull'
                            };
                        }

                        if (this.routerState.params[typeParam] === 'enviadas') {
                            tarefaFilter = {
                                'criadoPor.id': 'eq:' + this._profile.id,
                                'usuarioResponsavel.id': 'neq:' + this._profile.id,
                            };
                        }

                        if (this.routerState.params[typeParam] === 'coordenacao') {
                            tarefaFilter = {
                                dataHoraConclusaoPrazo: 'isNull'
                            };
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe((targetParam) => {
                                tarefaFilter['setorResponsavel.id'] = `eq:${this.routerState.params[targetParam]}`;
                            });
                        }

                        if (this.routerState.params[typeParam] === 'assessor') {
                            tarefaFilter = {
                                dataHoraConclusaoPrazo: 'isNull'
                            };
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe((targetParam) => {
                                tarefaFilter['usuarioResponsavel.id'] = `eq:${this.routerState.params[targetParam]}`;
                            });
                        }

                        if (this.routerState.params[typeParam] === 'minhas-tarefas') {
                            tarefaFilter = {
                                'usuarioResponsavel.id': 'eq:' + this._profile.id,
                                'dataHoraConclusaoPrazo': 'isNull'
                            };
                            let folderFilter = 'isNull';
                            let paramUrl = '';
                            let generoParam = this.routerState.params['generoHandle'];
                            if (navigationConverter.hasOwnProperty(this.routerState.params['generoHandle'])) {
                                generoParam = navigationConverter[this.routerState.params['generoHandle']];
                            }
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe((targetParam) => {
                                if (
                                    this.routerState.params[targetParam] !== 'entrada' &&
                                    this.routerState.params[targetParam] !== 'lixeira'
                                ) {
                                    const folderId = this.routerState.params[targetParam];
                                    folderFilter = `eq:${folderId}`;
                                }

                                paramUrl = this.routerState.params[targetParam];
                                if (this.routerState.params[targetParam] === 'lixeira') {
                                    tarefaFilter = {
                                        'usuarioResponsavel.id': 'eq:' + this._profile.id,
                                        'apagadoEm': 'gt:' + moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ss')
                                    };
                                }

                            });

                            if (paramUrl !== 'lixeira') {
                                params['folderFilter'] = {
                                    'folder.id': folderFilter
                                };
                                params.context['modulo'] = generoParam;
                            } else {
                                params.context['modulo'] = generoParam;
                                params.context['mostrarApagadas'] = true;
                            }
                        }

                        params['filter'] = tarefaFilter;
                    });

                    const routeGeneroParams = of('generoHandle');

                    routeGeneroParams.subscribe((param) => {
                        let generoParam = this.routerState.params[param];
                        if (navigationConverter.hasOwnProperty(this.routerState.params[param])) {
                            generoParam = navigationConverter[this.routerState.params[param]];
                        }

                        params['filter'] = {
                            ...params['filter'],
                            'especieTarefa.generoTarefa.nome': `eq:${generoParam.toUpperCase()}`
                        };
                    });

                    if (this.viewMode) {
                        params['viewMode'] = this.viewMode;
                    }

                    this.loadingTarefas = true;
                    this._store.dispatch(new fromStore.GetTarefas(params));
                    if (!tarefaHandle) {
                        this._store.dispatch(new fromStore.ChangeSelectedTarefas([]));
                    } else {
                        this._store.dispatch(new fromStore.ChangeSelectedTarefas([parseInt(tarefaHandle, 10)]));
                    }
                }
            }),
            filter(([loaded,,]) => loaded && this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] + '_' +
                this.routerState.params['targetHandle'] === loaded.value),
            take(1)
        );
    }
}
