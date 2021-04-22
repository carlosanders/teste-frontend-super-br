import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of, throwError} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessosAppState} from '../reducers';
import * as fromStore from '../../store';
import {getProcessosLoaded, getPessoaLoaded, getIsLoading, getPessoaLoading} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    private unidadeArquivistica = 2;
    routerState: any;

    loading: boolean = false;
    loadingPessoa: boolean = false;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<ProcessosAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store.pipe(select(getIsLoading)).subscribe(loading => this.loading = loading);

        this._store.pipe(select(getPessoaLoading)).subscribe(loading => this.loadingPessoa = loading);

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkRole(this.checkStore()).pipe(
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
     * @returns {Observable<any>}
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.getPessoa()
        ).pipe(
            filter(([pessoaLoaded]) => !!(pessoaLoaded)),
            take(1),
            switchMap(() =>
                this.getProcessos()
            )
        );
    }

    /**
     * check Role admin
     *
     * @returns {Observable<any>}
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_USUARIO_EXTERNO')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        return observable;
    }

    /**
     * Get Processos
     *
     * @returns {Observable<any>}
     */
    getProcessos(): any {
        return this._store.pipe(
            select(getProcessosLoaded),
            tap((loaded: any) => {
                if (!this.loading && (!this.routerState.params['typeHandle'] || !this.routerState.params['targetHandle'] ||
                    (this.routerState.params['typeHandle'] + '_' + this.routerState.params['targetHandle'] + '_' + this._profile.id) !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadProcessos({reset: true}));

                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC'},
                        populate: [
                            'especieProcesso',
                            'especieProcesso.generoProcesso',
                            'modalidadeMeio',
                            'modalidadeFase',
                            'documentoAvulsoOrigem',
                            'classificacao',
                            'classificacao.modalidadeDestinacao',
                            'setorInicial',
                            'setorAtual',
                            'lembretes',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'assuntos'
                        ]
                    };

                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe(typeParam => {
                        let processoFilter = {};
                        if (this.routerState.params[typeParam] === 'meus-processos') {
                            processoFilter = {
                                'criadoPor.id': `eq:${this._profile.id}`,
                                'unidadeArquivistica': `eq:${this.unidadeArquivistica}`,
                                'protocoloEletronico': 'eq:true'
                            };
                        }

                        if (this.routerState.params[typeParam] === 'interessados') {
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe(targetParam => {
                                processoFilter = {
                                    'interessados.pessoa.id': `eq:${this.routerState.params[targetParam]}`,
                                    'unidadeArquivistica': `eq:${this.unidadeArquivistica}`,
                                    'protocoloEletronico': 'eq:true'
                                };
                            });
                        }

                        params['filter'] = processoFilter;
                    });

                    this._store.dispatch(new fromStore.GetProcessos(params));
                    this._store.dispatch(new fromStore.ChangeSelectedProcessos([]));
                    this.loading = true;
                }
            }),
            filter((loaded: any) => {
                return this.loading || (this.routerState.params['typeHandle'] && this.routerState.params['targetHandle'] &&
                    (this.routerState.params['typeHandle'] + '_' + this.routerState.params['targetHandle'] + '_' + this._profile.id) === loaded.value);
            }),
            take(1)
        );
    }

    /**
     * Get Pessoa
     *
     * @returns {Observable<any>}
     */
    getPessoa(): any {
        return this._store.pipe(
            select(getPessoaLoaded),
            tap((loaded: any) => {
                if (!this.loadingPessoa && (this.routerState.params['typeHandle'] && this.routerState.params['targetHandle']
                    && this.routerState.params['typeHandle'] + '_' + this.routerState.params['targetHandle'] !== loaded.value)) {
                    const routerParam = this.routerState.params['targetHandle'] === 'entrada' ?
                        this._profile.vinculacoesPessoasUsuarios[0].pessoa.id : this.routerState.params['targetHandle'];

                    const params = {
                        filter: {
                            id: `eq:${routerParam}`
                        },
                        limit: 1,
                        offset: 0,
                        sort: {},
                        populate: ['populateAll']
                    };

                    this._store.dispatch(new fromStore.GetPessoa(params));
                    this.loadingPessoa = true;
                }
            }),
            filter((loaded: any) => {
                return this.loadingPessoa || (this.routerState.params['typeHandle'] && this.routerState.params['targetHandle']
                    && this.routerState.params['typeHandle'] + '_' + this.routerState.params['targetHandle'] === loaded.value);
            }),
            take(1)
        );
    }
}
