import {Actions, Effect, ofType} from '@ngrx/effects';
import {TransicaoService} from '../../../../../../../@cdk/services/transicao.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from '../../../../../../store/reducers';
import {Router} from '@angular/router';
import * as RealizarTransicaoActions from '../actions/realizar-transicao.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as fromStore from '../../store';

@Injectable()
export class RealizarTransicaoEffects {
    routerState: any;
    private currentDate: any;

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this.initRouterState();
    }

    /**
     * Save RealizarTransicao
     * @type {Observable<any>}
     */
    @Effect()
    saveRealizarTransicao: any =
        this._actions
            .pipe(
                ofType<RealizarTransicaoActions.SaveRealizarTransicao>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO),
                switchMap((action) => {
                    return this._transicaoService.save(action.payload).pipe(
                        mergeMap((response: Transicao) => [
                            new RealizarTransicaoActions.SaveRealizarTransicaoSuccess(),
                            new AddData<Transicao>({data: [response], schema: transicaoSchema})
                        ]),
                        catchError((err) => {
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'realizar-transicao',
                                content: `Houve um erro ao realizar a transição para o processo id ${action.payload.processo.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new RealizarTransicaoActions.SaveRealizarTransicaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save RealizarTransicao Success
     */
    @Effect({dispatch: false})
    saveRealizarTransicaoSuccess: any =
        this._actions
            .pipe(
                ofType<RealizarTransicaoActions.SaveRealizarTransicaoSuccess>(RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_SUCCESS),
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
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/pendencia-analise']).then();
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
