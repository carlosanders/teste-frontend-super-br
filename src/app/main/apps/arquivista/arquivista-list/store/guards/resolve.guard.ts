import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, forkJoin, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ArquivistaAppState} from 'app/main/apps/arquivista/arquivista-list/store/reducers';
import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {getProcessosLoaded} from 'app/main/apps/arquivista/arquivista-list/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';
import * as moment from 'moment';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;
    private currentDate: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ArquivistaAppState>,
        private _loginService: LoginService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

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
        return this.getProcessos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }


    /**
     * Get Processos
     *
     * @returns {Observable<any>}
     */
    getProcessos(): any {
        this._store.dispatch(new fromStore.UnloadProcessos({reset: true}));
        return this._store.pipe(
            select(getProcessosLoaded),
            tap((loaded: any) => {

                const params = {
                    listFilter: {},
                    etiquetaFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC', lembretes: 'DESC'},
                    populate: [
                        'especieProcesso',
                        'modalidadeMeio',
                        'modalidadeFase',
                        'documentoAvulsoOrigem',
                        'especieProcesso',
                        'classificacao',
                        'classificacao.modalidadeDestinacao',
                        'setorInicial',
                        'setorAtual',
                        'lembretes',
                        'vinculacoesEtiquetas',
                        'vinculacoesEtiquetas.etiqueta'

                    ]
                };

                const routeTypeParam = of('typeHandle');
                routeTypeParam.subscribe(typeParam => {
                    let processoFilter = {};


                    this.currentDate =  moment().format('YYYY-m-d[T]H:mm:ss');

                    if (this.routerState.params[typeParam] === 'pronto-transicao') {
                        processoFilter = {
                            dataHoraProximaTransicao: 'lt:' + this.currentDate,
                            modalidadeFase: 'in:1,2',

                        };
                    }

                    if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                        processoFilter = {
                            dataHoraProximaTransicao: 'gte:' + this.currentDate,
                            modalidadeFase: 'in:1,2',
                        };
                    }

                    if (this.routerState.params[typeParam] === 'pendencia-analise') {
                        processoFilter = {
                            dataHoraProximaTransicao: 'isNull',
                            modalidadeFase: 'in:1,2',
                        };

                    }

                    params['filter'] = processoFilter;
                });

                const routeUnidadeParams = of('unidadeHandle');
                // routeUnidadeParams.subscribe(param => {
                //     params['filter'] = {
                //         ...params['filter'],
                //         'localizador.setor.unidade.id': `eq:${this.routerState.params[param]}`
                //     };
                // });
                if (!this.routerState.params['unidadeHandle'] || !this.routerState.params['typeHandle'] ||

                    (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle'] ) !==
                    loaded.value) {
                    this._store.dispatch(new fromStore.GetProcessos(params));

                }

            }),
            filter((loaded: any) => {
                return this.routerState.params['unidadeHandle'] && this.routerState.params['typeHandle'] &&
                    (this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['typeHandle']) ===
                    loaded.value;
            }),
            take(1)
        );
    }
}