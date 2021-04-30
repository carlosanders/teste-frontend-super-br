import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import {ArquivistaAppState} from 'app/main/apps/arquivista/arquivista-list/store/reducers';
import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {getProcessosLoaded} from 'app/main/apps/arquivista/arquivista-list/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';
import {Colaborador, Setor, Usuario} from '@cdk/models';
import * as moment from 'moment';
import {getIsLoading} from "app/main/apps/arquivista/arquivista-list/store";

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;
    private currentDate: any;
    colaborador: Colaborador;

    loading: boolean = false;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this._store.pipe(select(getIsLoading)).subscribe(loading => this.loading = loading);
        this._profile = _loginService.getUserProfile();
        this.checkRole();
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getProcessos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    checkRole(): any {
        if (this._profile.roles.filter(this.isArquivista).length === 0) {
            this._router.navigate([
                'apps/painel']
            ).then();
        }
    }

    isArquivista(role): any {
        return role === 'ROLE_ARQUIVISTA';
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
                if (!this.loading && (!this.routerState.params['unidadeHandle'] || !this.routerState.params['typeHandle'] ||
                    (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle']) !== loaded.value)) {
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
                            'vinculacoesEtiquetas.etiqueta'
                        ]
                    };

                    let processoFilter = {
                        'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                        'setorAtual.id': 'eq:' + this.routerState.params['unidadeHandle']
                    };
                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe(typeParam => {
                        this.currentDate = moment().format('YYYY-MM-DD[T]H:mm:ss');

                        if (this.routerState.params[typeParam] === 'pronto-transicao') {
                            processoFilter['dataHoraProximaTransicao'] = 'lte:' + this.currentDate;
                        }

                        if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                            processoFilter['dataHoraProximaTransicao'] = 'gt:' + this.currentDate;
                        }

                        if (this.routerState.params[typeParam] === 'pendencia-analise') {
                            processoFilter['dataHoraProximaTransicao'] = 'isNull';
                        }

                        params['filter'] = processoFilter;
                    });

                    this._store.dispatch(new fromStore.GetProcessos(params));
                    this.loading = true;
                }
            }),
            filter((loaded: any) => {
                return this.loading || (this.routerState.params['unidadeHandle'] && this.routerState.params['typeHandle'] &&
                    (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle']) === loaded.value);
            }),
            take(1)
        );
    }
}
