import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {Injectable} from '@angular/core';
import {AddData} from '@cdk/ngrx-normalizr';

import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {LembreteService} from '@cdk/services/lembrete.service';

import {getRouterState, State} from '../../../../../../store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as LembreteActions from '../actions/lembrete.actions';
import * as fromStore from '../../store';

@Injectable()
export class LembreteEffects {
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
        private _store: Store<State>,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _router: Router

    ) {
        this.initRouterState();
        this.setorAtual = this._loginService.getUserProfile().colaborador.lotacoes[0].setor.id;
    }

    /**
     * Get Lembrete with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getLembrete: any =
        this._actions
            .pipe(
                ofType<LembreteActions.GetLembrete>(LembreteActions.GET_LEMBRETE),
                switchMap((action) => {
                    return this._lembreteService.query(
                        JSON.stringify(action.payload),
                        5,
                        0,
                        JSON.stringify({
                            criadoEm: 'DESC'
                        }),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Lembrete>({data: response['entities'], schema: lembreteSchema}),
                    new LembreteActions.GetLembreteSuccess({
                        loaded: {
                            id: 'lembreteHandle',
                            value: this.routerState.params.lembreteHandle
                        },
                        lembreteId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LembreteActions.GetLembreteFailed(err));
                    return caught;
                })
            );

    /**
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<LembreteActions.GetProcessos>(LembreteActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter,
                            ...action.payload.etiquetaFilter
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new LembreteActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        loaded: {
                            id: 'unidadeHandle_typeHandle',
                            value: this.routerState.params.unidadeHandle + '_' +
                                this.routerState.params.typeHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LembreteActions.GetProcessosFailed(err));
                    return caught;
                })
            );


    /**
     * Save Lembrete
     * @type {Observable<any>}
     */
    @Effect()
    saveLembrete: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembrete>(LembreteActions.SAVE_LEMBRETE),
                switchMap((action) => {
                    return this._lembreteService.save(action.payload).pipe(
                        mergeMap((response: Lembrete) => [
                            new LembreteActions.SaveLembreteSuccess(),
                            new AddData<Lembrete>({data: [response], schema: lembreteSchema}),
                            new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Lembrete id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new LembreteActions.SaveLembreteFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Lembrete Success
     */
    @Effect({dispatch: false})
    saveLembreteSuccess: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembreteSuccess>(LembreteActions.SAVE_LEMBRETE_SUCCESS),
                tap(() => {

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
                                'dataHoraProximaTransicao': 'lt:' + this.currentDate,
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual': 'in:' + this.setorAtual

                            };
                        }

                        if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                            processoFilter = {
                                'dataHoraProximaTransicao': 'gte:' + this.currentDate,
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual': 'in:' + this.setorAtual
                            };
                        }

                        if (this.routerState.params[typeParam] === 'pendencia-analise') {
                            processoFilter = {
                                'dataHoraProximaTransicao': 'isNull',
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual': 'in:' + this.setorAtual
                            };

                        }

                        params['filter'] = processoFilter;
                    });

                    this._store.dispatch(new fromStore.GetProcessos(params));
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle + '/detalhe/processo/' + this.routerState.params.processoHandle + '/visualizar']).then();
                })
            );


    initRouterState(): void{
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}
