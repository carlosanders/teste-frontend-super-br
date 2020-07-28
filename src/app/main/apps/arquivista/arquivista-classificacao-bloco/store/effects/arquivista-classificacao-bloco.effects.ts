import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import * as ArquivistaClassificacaoBloco from '../actions/arquivista-classificacao-bloco.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../../store';
import {getRouterState, State} from '../../../../../../store/reducers';

@Injectable()
export class ArquivistaClassificacaoBlocoBlocoEffects {
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this.initRouterState();
        this.setorAtual = this._loginService.getUserProfile().colaborador.lotacoes[0].setor.id;
    }

    /**
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: Observable<any> =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoBloco.GetProcessos>(ArquivistaClassificacaoBloco.GET_PROCESSOS),
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
                    new ArquivistaClassificacaoBloco.GetProcessosSuccess({
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
                    this._store.dispatch(new ArquivistaClassificacaoBloco.GetProcessosFailed(err));
                    return caught;
                })
            );


    /**
     * Save ArquivistaClassificacaoBloco
     * @type {Observable<any>}
     */
    @Effect()
    saveArquivistaClassificacaoBloco: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBloco>(ArquivistaClassificacaoBloco.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO),
                switchMap((action) => {
                    return this._processoService.patch(action.payload, {classificacao: action.payload.classificacao}).pipe(
                        mergeMap((response: Processo) => [
                            new ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBlocoSuccess(action.payload),
                            new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {classificacao: response.classificacao}}),
                            new OperacoesActions.Resultado({
                                type: 'classificacao',
                                content: `Classificações de processos Atualizados com sucesso!`,
                                dateTime: response.criadoEm,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'classificacao',
                                content: `Houve ao adicionar lembrete ao processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBlocoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save ArquivistaClassificacao Success
     */
    @Effect({dispatch: false})
    saveArquivistaClassificacaoBlocoSuccess: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoBloco.SaveArquivistaClassificacaoBlocoSuccess>(ArquivistaClassificacaoBloco.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS),
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

