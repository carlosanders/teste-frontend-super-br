import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as ArquivistaClassificacaoActions from '../actions/arquivista-classificacao-edit.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as fromStore from '../../store';
import {LoginService} from '../../../../../auth/login/login.service';
import {ClassificacaoService} from '@cdk/services/classificacao.service';

@Injectable()
export class ArquivistaClassificacaoEditEffects {
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _loginService: LoginService,
        private _classificacaoService: ClassificacaoService,
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
                ofType<ArquivistaClassificacaoActions.GetProcessos>(ArquivistaClassificacaoActions.GET_PROCESSOS),
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
                    new ArquivistaClassificacaoActions.GetProcessosSuccess({
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
                    this._store.dispatch(new ArquivistaClassificacaoActions.GetProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Save ArquivistaClassificacao
     * @type {Observable<any>}
     */
    @Effect()
    saveArquivistaClassificacao: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoActions.SaveArquivistaClassificacao>(ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO),
                switchMap((action) => {
                    return this._processoService.patch(action.payload.values.processo, action.payload.changes).pipe(
                        mergeMap((response: Processo) => [
                            new ArquivistaClassificacaoActions.GetArquivistaClassificacao(action.payload),
                            new UpdateData<Processo>({id: response.id, schema: processoSchema, changes: {classificacao: response.classificacao}}),
                            new ArquivistaClassificacaoActions.SaveArquivistaClassificacaoSuccess(),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} Atualizado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new ArquivistaClassificacaoActions.SaveArquivistaClassificacaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save ArquivistaClassificacao Success
     */
    @Effect({dispatch: false})
    saveArquivistaClassificacaoSuccess: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoActions.SaveArquivistaClassificacaoSuccess>(ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_SUCCESS),
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
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
                    + this.routerState.params.typeHandle + '/detalhe/processo/' + this.routerState.params.processoHandle + '/visualizar']).then();
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
