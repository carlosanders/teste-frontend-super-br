import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {Processo, Transicao} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {TransicaoService} from '../../../../../../../@cdk/services/transicao.service';

import {AddData, RemoveData, SetData} from '@cdk/ngrx-normalizr';
import * as TransicaoArquivistaBloco from '../actions/transicao-arquivista-bloco.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../../store';
import {getRouterState, State} from '../../../../../../store/reducers';

@Injectable()
export class TransicaoArquivistaBlocoEffects {
    routerState: any;
    private currentDate: any;
    setorAtual: number;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _transicaoService: TransicaoService,
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
                ofType<TransicaoArquivistaBloco.GetProcessos>(TransicaoArquivistaBloco.GET_PROCESSOS),
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

                    new TransicaoArquivistaBloco.GetProcessosSuccess({
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
                    this._store.dispatch(new TransicaoArquivistaBloco.GetProcessosFailed(err));
                    return caught;
                })
            );


    /**
     * Save TransicaoArquivistaBloco
     * @type {Observable<any>}
     */
    @Effect()
    saveTransicaoArquivistaBloco: any =
        this._actions
            .pipe(
                ofType<TransicaoArquivistaBloco.SaveTransicaoArquivistaBloco>(TransicaoArquivistaBloco.SAVE_TRANSICAO_ARQUIVISTA_BLOCO),
                switchMap((action) => {
                    new TransicaoArquivistaBloco.SaveTransicaoArquivistaBlocoSuccess(action.payload.processo.id);
                    // new RemoveData({
                    //     id: action.payload.processo.id,
                    //     schema: processoSchema,
                    //     removeChildren: processoSchema
                    // });

                    return this._transicaoService.save(action.payload).pipe(
                        mergeMap((response: Transicao) => [
                            new TransicaoArquivistaBloco.SaveTransicaoArquivistaBlocoSuccess(action.payload.processo.id),
                            new OperacoesActions.Resultado({
                                type: 'transicao',
                                content: `Transições de processos realizadas com sucesso!`,
                                dateTime: response.criadoEm,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'transicao',
                                content: `Houve um erro ao realizar a transição para o processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new TransicaoArquivistaBloco.SaveTransicaoArquivistaBlocoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save ArquivistaClassificacao Success
     */
    @Effect({dispatch: false})
    saveTransicaoArquivistaBlocoSuccess: any =
        this._actions
            .pipe(
                ofType<TransicaoArquivistaBloco.SaveTransicaoArquivistaBlocoSuccess>(TransicaoArquivistaBloco.SAVE_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS),
                tap(() => {
                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC', lembretes: 'DESC'},
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

                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe(typeParam => {
                        let processoFilter = {};

                        this.currentDate = moment().format('YYYY-MM-DD[T]H:mm:ss');

                        if (this.routerState.params[typeParam] === 'pronto-transicao') {
                            processoFilter = {
                                'dataHoraProximaTransicao': 'lt:' + this.currentDate,
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual.id': 'eq:' + this.setorAtual

                            };
                        }

                        if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                            processoFilter = {
                                'dataHoraProximaTransicao': 'gte:' + this.currentDate,
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual.id': 'eq:' + this.setorAtual
                            };
                        }

                        if (this.routerState.params[typeParam] === 'pendencia-analise') {
                            processoFilter = {
                                'dataHoraProximaTransicao': 'isNull',
                                'modalidadeFase.valor': 'in:CORRENTE,INTERMEDIÁRIA',
                                'setorAtual.id': 'eq:' + this.setorAtual
                            };

                        }
                        params['filter'] = processoFilter;
                    });

                    this._store.dispatch(new fromStore.GetProcessos(params));
                    // Foi autorizado pelo Leo para ser refatorado esse codigo posteriormente.
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle
                    + '/aguardando-decurso']).then();
                    setTimeout(() => {
                        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle
                        + '/pronto-transicao']).then();
                    }, 100);

                })
            );


    initRouterState(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }
}

