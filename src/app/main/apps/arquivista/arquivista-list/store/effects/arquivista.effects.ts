import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ArquivistaActions from '../actions/arquivista.actions';

import {Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getPagination} from '../selectors';
import * as moment from 'moment';

@Injectable()
export class ArquivistaEffect {
    routerState: any;
    /**
     * Get Processos with router parameters
     *
     * @type {Observable<any>}
     */
    getProcessos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ArquivistaActions.GetProcessos>(ArquivistaActions.GET_PROCESSOS),
        switchMap(action => this._processoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify({}),
            'app/main/apps/arquivista#lista')),
        concatMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ArquivistaActions.GetProcessosSuccess({
                entitiesId: response['entities'].map(processo => processo.id),
                loaded: {
                    id: 'unidadeHandle_typeHandle',
                    value: this.routerState.params.unidadeHandle + '_' +
                        this.routerState.params.typeHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ArquivistaActions.GetProcessosFailed(err));
        })
    ));
    /**
     * Update Processo
     *
     * @type {Observable<any>}
     */
    setCurrentProcesso: Observable<ArquivistaActions.ArquivistaActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ArquivistaActions.SetCurrentProcesso>(ArquivistaActions.SET_CURRENT_PROCESSO),
        map((action) => {
            if (action.payload.acessoNegado) {
                this._router.navigate([
                    'apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle + '/detalhe/processo/' +
                    action.payload.processoId + '/acesso-negado']
                ).then();
            } else {
                this._router.navigate([
                    'apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle + '/detalhe/processo/' +
                    action.payload.processoId + '/visualizar']
                ).then();
            }
            return new ArquivistaActions.SetCurrentProcessoSuccess();
        })
    ));
    /**
     * Reload Processos
     *
     * @type {Observable<any>}
     */
    reloadProcessos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ArquivistaActions.ReloadProcessos>(ArquivistaActions.RELOAD_PROCESSOS),
        withLatestFrom(this._store.pipe(select(getPagination))),
        concatMap(([action, pagination]) => {
            const currentDate = moment().format('YYYY-MM-DD[T]H:mm:ss');
            const processoFilter = {
                ...pagination.filter
            };
            if (this.routerState.params['typeHandle'] === 'pronto-transicao') {
                processoFilter['dataHoraProximaTransicao'] = 'lte:' + currentDate;
            }

            if (this.routerState.params['typeHandle'] === 'aguardando-decurso') {
                processoFilter['dataHoraProximaTransicao'] = 'gt:' + currentDate;
            }

            if (this.routerState.params['typeHandle'] === 'pendencia-analise') {
                processoFilter['dataHoraProximaTransicao'] = 'isNull';
            }

            return this._processoService.query(
                JSON.stringify({
                    ...processoFilter,
                    ...pagination.listFilter,
                    ...pagination.etiquetaFilter
                }),
                pagination.limit,
                pagination.offset,
                JSON.stringify(pagination.sort),
                JSON.stringify(pagination.populate));

        }),
        concatMap(response => [
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ArquivistaActions.GetProcessosSuccess({
                entitiesId: response['entities'].map(processo => processo.id),
                loaded: {
                    id: 'unidadeHandle_typeHandle',
                    value: this.routerState.params.unidadeHandle + '_' +
                        this.routerState.params.typeHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ArquivistaActions.GetProcessosFailed(err));
        })
    ));
    /**
     * Change Selected Processos
     */
    changeSelectedProcessos: any = createEffect(() => this._actions.pipe(
        ofType<ArquivistaActions.ChangeSelectedProcessos>(ArquivistaActions.CHANGE_SELECTED_PROCESSOS),
        tap((action) => {
            if (action.redirect) {
                if (action.payload.length > 1) {
                    this._router.navigate([
                        'apps',
                        'arquivista',
                        this.routerState.params.unidadeHandle,
                        this.routerState.params.typeHandle,
                        'operacoes-bloco'
                    ]).then();
                } else if (this.routerState.url.indexOf('bloco') > 0) {
                    this._router.navigate([
                        'apps',
                        'arquivista',
                        this.routerState.params.unidadeHandle,
                        this.routerState.params.typeHandle
                    ]).then();
                }
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
