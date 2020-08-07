import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {Injectable} from '@angular/core';

import {ProcessoService} from '../../../../../../../@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {LembreteService} from '../../../../../../../@cdk/services/lembrete.service';
import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr';
import {processo as processoSchema} from '@cdk/normalizr';

import {AddChildData, AddData} from '@cdk/ngrx-normalizr';
import * as fromStore from '../../store';
import {getRouterState, State} from '../../../../../../store/reducers';
import * as LembreteActions from '../actions/lembrete-bloco.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LembreteBlocoEffects {
    routerState: any;
    setorAtual: number;
    private currentDate: any;

    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
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
    saveLembreteBloco: any =
        this._actions
            .pipe(
                ofType<LembreteActions.SaveLembreteBloco>(LembreteActions.SAVE_LEMBRETE_BLOCO),
                switchMap((action) => {
                    return this._lembreteService.save(action.payload).pipe(
                        mergeMap((response: Lembrete) => [
                            new LembreteActions.SaveLembreteBlocoSuccess(action.payload),
                            new AddChildData<Lembrete>({
                                data: [{...action.payload, ... response}],
                                childSchema: lembreteSchema,
                                parentId: action.payload.processo.id,
                                parentSchema: processoSchema
                            }),
                            new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Lembrete em bloco criado com sucesso!`,
                                dateTime: response.criadoEm,
                                success: true
                            })
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'lembrete',
                                content: `Houve ao adicionar lembrete ao processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new LembreteActions.SaveLembreteBlocoFailed(err));
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
                ofType<LembreteActions.SaveLembreteBlocoSuccess>(LembreteActions.SAVE_LEMBRETE_BLOCO_SUCCESS),
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

                        this.currentDate =  moment().format('YYYY-MM-DD[T]H:mm:ss');

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
