import {Actions, Effect, ofType} from '@ngrx/effects';
import {LembreteService} from '@cdk/services/lembrete.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as LembreteActions from '../actions/lembrete.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Lembrete, Processo} from '@cdk/models';
import {lembrete as lembreteSchema} from '@cdk/normalizr/lembrete.schema';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromStore from '../index';
import {documentoAvulso as documentoAvulsoSchema} from '../../../../../../../@cdk/normalizr/documento-avulso.schema';
import * as ArquivistaActions from '../actions/arquivista.actions';
import {GetDocumentos} from '../../../../tarefas/tarefa-detail/atividades/atividade-create/store/actions';
import * as moment from 'moment';


@Injectable()
export class LembreteEffects {
    routerState: any;
    private currentDate: any;

    constructor(
        private _actions: Actions,
        private _lembreteService: LembreteService,
        private _store: Store<State>,
        private _router: Router
    ) {

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }


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
                            // new ArquivistaActions.GetProcesso(ArquivistaActions.GET_PROCESSO),
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

                    // this._store.dispatch(new fromStore.UnloadProcessos({reset: false}));

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

                    this._store.dispatch(new fromStore.GetProcessos(params));
                })
            );
}
