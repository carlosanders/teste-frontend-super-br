import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, forkJoin, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {TarefasAppState} from 'app/main/apps/tarefas/store/reducers';
import * as fromStore from 'app/main/apps/tarefas/store';
import {getFoldersLoaded, getTarefasLoaded, getIsLoading} from 'app/main/apps/tarefas/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';

import {navigationConverter} from '../../../../../navigation/navigation';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;

    loadingTarefas: boolean = false;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<TarefasAppState>,
        public _loginService: LoginService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getIsLoading))
            .subscribe((loading) => {
                this.loadingTarefas = loading;
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
            select(getFoldersLoaded),
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
        return this._store.pipe(
            select(getTarefasLoaded),
            tap((loaded: any) => {
                if (!this.loadingTarefas && (!this.routerState.params['generoHandle'] || !this.routerState.params['typeHandle'] ||
                    !this.routerState.params['targetHandle'] ||
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] +
                        '_' + this.routerState.params['targetHandle']) !== loaded.value)) {

                    this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));

                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraDistribuicao: 'DESC'},
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
                            'processo.especieProcesso.workflow-edit',
                            'workflow'
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
                                    const folderName = this.routerState.params[targetParam];
                                    folderFilter = `eq:${folderName.toUpperCase()}`;
                                }

                                paramUrl = this.routerState.params[targetParam];
                                if (this.routerState.params[targetParam] === 'lixeira') {
                                    tarefaFilter = {
                                        'usuarioResponsavel.id': 'eq:' + this._profile.id,
                                        'apagadoEm': 'isNotNull'
                                    };
                                }

                            });

                            if (paramUrl !== 'lixeira') {
                                params['folderFilter'] = {
                                    'folder.nome': folderFilter
                                };
                                params.context = {modulo: generoParam};
                            } else {
                                params.context = {
                                    modulo: generoParam,
                                    mostrarApagadas: true
                                };
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

                    this._store.dispatch(new fromStore.GetTarefas(params));
                    this._store.dispatch(new fromStore.ChangeSelectedTarefas([]));
                    this.loadingTarefas = true;
                }
            }),
            filter((loaded: any) => this.loadingTarefas || (this.routerState.params['generoHandle'] && this.routerState.params['typeHandle'] &&
                    this.routerState.params['targetHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] + '_' +
                        this.routerState.params['targetHandle']) ===
                    loaded.value)),
            take(1)
        );
    }
}
