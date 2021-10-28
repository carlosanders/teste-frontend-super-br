import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ArquivistaAppState} from 'app/main/apps/arquivista/arquivista-list/store/reducers';
import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {
    getIsLoading,
    getIsLoadingModalidadeTransicao,
    getModalidadeTransicaoLoaded
} from 'app/main/apps/arquivista/arquivista-list/store';
import {getProcessosLoaded} from 'app/main/apps/arquivista/arquivista-list/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';
import {Colaborador, Usuario} from '@cdk/models';
import * as moment from 'moment';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    colaborador: Colaborador;
    loading: boolean = false;
    loadingModalidadeTransicao: boolean = false;
    private _profile: Usuario;
    private currentDate: any;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _store: Store<ArquivistaAppState>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(select(getIsLoading)).subscribe(loading => this.loading = loading);
        this._store.pipe(select(getIsLoadingModalidadeTransicao)).subscribe(loading => this.loadingModalidadeTransicao = loading);
        this._profile = _loginService.getUserProfile();
        this.checkRole();
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
        return forkJoin([this.getProcessos(), this.getModalidadeTransicao()]).pipe(
            take(1)
        );
    }

    checkRole(): any {
        if (this._profile.roles.filter(this.isArquivista).length === 0) {
            this._router.navigate(['apps/painel']).then();
        }
    }

    isArquivista(role): any {
        return role === 'ROLE_ARQUIVISTA';
    }

    /**
     * Get Processos
     *
     * @returns
     */
    getProcessos(): any {
        return this._store.pipe(
            select(getProcessosLoaded),
            tap((loaded: any) => {
                if (!this.loading && (!this.routerState.params['unidadeHandle'] || !this.routerState.params['typeHandle'] ||
                    (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle']) !== loaded.value)) {
                    this.loading = true;
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
                            'setorAtual.especieSetor',
                            'setorAtual',
                            'lembretes',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]
                    };

                    const processoFilter = {
                        'setorAtual.id': 'eq:' + this.routerState.params['unidadeHandle']
                    };
                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe((typeParam) => {
                        this.currentDate = moment().format('YYYY-MM-DD[T]H:mm:ss');

                        if (this.routerState.params[typeParam] === 'pronto-transferencia') {
                            processoFilter['dataHoraProximaTransicao'] = 'lte:' + this.currentDate;
                            processoFilter['modalidadeFase.valor'] = 'eq:CORRENTE';
                        }

                        if (this.routerState.params[typeParam] === 'pronto-eliminacao') {
                            processoFilter['dataHoraProximaTransicao'] = 'lte:' + this.currentDate;
                            processoFilter['modalidadeFase.valor'] = 'eq:INTERMEDIÁRIA';
                            processoFilter['classificacao.modalidadeDestinacao.valor'] = 'eq:ELIMINAÇÃO';
                        }

                        if (this.routerState.params[typeParam] === 'pronto-recolhimento') {
                            processoFilter['dataHoraProximaTransicao'] = 'lte:' + this.currentDate;
                            processoFilter['modalidadeFase.valor'] = 'eq:INTERMEDIÁRIA';
                            processoFilter['classificacao.modalidadeDestinacao.valor'] = 'eq:RECOLHIMENTO';
                        }

                        if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                            processoFilter['dataHoraProximaTransicao'] = 'gt:' + this.currentDate;
                            processoFilter['modalidadeFase.valor'] = 'in:CORRENTE,INTERMEDIÁRIA';
                        }

                        if (this.routerState.params[typeParam] === 'pendencia-analise') {
                            processoFilter['dataHoraProximaTransicao'] = 'isNull';
                            processoFilter['modalidadeFase.valor'] = 'in:CORRENTE,INTERMEDIÁRIA';
                        }

                        params['filter'] = processoFilter;
                    });

                    this._store.dispatch(new fromStore.GetProcessos(params));
                }
            }),
            filter((loaded: any) => this.loading || (this.routerState.params['unidadeHandle'] && this.routerState.params['typeHandle'] &&
                (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle']) === loaded.value)),
            take(1)
        );
    }

    /**
     * Get ModalidadeTransicao
     *
     * @returns
     */
    getModalidadeTransicao(): any {
        if (this.routerState.params['typeHandle'] && this.routerState.params['typeHandle'].indexOf('pronto-') > -1) {
            return this._store.pipe(
                select(getModalidadeTransicaoLoaded),
                tap((loaded: any) => {
                    if (!this.loadingModalidadeTransicao && (!loaded || !this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                        const params = {
                            limit: 1,
                            offset: 0,
                            sort: {},
                            populate: []
                        };
                        const modalidadeFilter = {};
                        if (this.routerState.params['typeHandle'] === 'pronto-transferencia') {
                            modalidadeFilter['valor'] = 'eq:TRANSFERÊNCIA';
                        }

                        if (this.routerState.params['typeHandle'] === 'pronto-eliminacao') {
                            modalidadeFilter['valor'] = 'eq:ELIMINAÇÃO';
                        }

                        if (this.routerState.params['typeHandle'] === 'pronto-recolhimento') {
                            modalidadeFilter['valor'] = 'eq:RECOLHIMENTO';
                        }

                        params['filter'] = modalidadeFilter;
                        this._store.dispatch(new fromStore.GetModalidadeTransicao(params));
                        this.loadingModalidadeTransicao = true;
                    }
                }),
                filter((loaded: any) => this.loadingModalidadeTransicao || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getModalidadeTransicaoLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadModalidadeTransicao());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}
