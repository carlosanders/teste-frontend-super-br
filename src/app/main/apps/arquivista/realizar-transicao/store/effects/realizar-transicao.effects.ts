import {TransicaoService} from '../../../../../../../@cdk/services/transicao.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {getRouterState, State} from '../../../../../../store/reducers';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as RealizarTransicoesActions from '../actions/realizar-transicao.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Transicao} from '../../../../../../../@cdk/models';
import {AddData} from '../../../../../../../@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';

export class RealizarTransicaoEffects {
    routerState: any;
    private currentDate: any;

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
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
     * Save Transicao
     * @type {Observable<any>}
     */
    @Effect()
    saveTransicao: any =
        this._actions
            .pipe(
                ofType<RealizarTransicoesActions.SaveTransicao>(RealizarTransicoesActions.SAVE_TRANSICAO),
                switchMap((action) => {
                    debugger
                    return this._transicaoService.save(action.payload).pipe(
                        mergeMap((response: Transicao) => [
                            new RealizarTransicoesActions.SaveTransicaoSuccess(),
                            new AddData<Transicao>({data: [response], schema: transicaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'transicao',
                                content: `Transição id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new RealizarTransicoesActions.SaveTransicaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Transicao Success
     */
    @Effect({dispatch: false})
    saveTransicaoSuccess: any =
        this._actions
            .pipe(
                ofType<RealizarTransicoesActions.SaveTransicaoSuccess>(RealizarTransicoesActions.SAVE_TRANSICAO_SUCCESS),
                tap(() => {

                    // const params = {
                    //     listFilter: {},
                    //     etiquetaFilter: {},
                    //     limit: 10,
                    //     offset: 0,
                    //     sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC', lembretes: 'DESC'},
                    //     populate: [
                    //         'especieProcesso',
                    //         'modalidadeMeio',
                    //         'modalidadeFase',
                    //         'documentoAvulsoOrigem',
                    //         'especieProcesso',
                    //         'classificacao',
                    //         'classificacao.modalidadeDestinacao',
                    //         'setorInicial',
                    //         'setorAtual',
                    //         'lembretes',
                    //         'vinculacoesEtiquetas',
                    //         'vinculacoesEtiquetas.etiqueta'
                    //
                    //     ]
                    // };
                    //
                    // const routeTypeParam = of('typeHandle');
                    // routeTypeParam.subscribe(typeParam => {
                    //     let processoFilter = {};
                    //
                    //     this.currentDate =  moment().format('YYYY-m-d[T]H:mm:ss');
                    //
                    //     if (this.routerState.params[typeParam] === 'pronto-transicao') {
                    //         processoFilter = {
                    //             dataHoraProximaTransicao: 'lt:' + this.currentDate,
                    //             modalidadeFase: 'in:1,2',
                    //
                    //         };
                    //     }
                    //
                    //     if (this.routerState.params[typeParam] === 'aguardando-decurso') {
                    //         processoFilter = {
                    //             dataHoraProximaTransicao: 'gte:' + this.currentDate,
                    //             modalidadeFase: 'in:1,2',
                    //         };
                    //     }
                    //
                    //     if (this.routerState.params[typeParam] === 'pendencia-analise') {
                    //         processoFilter = {
                    //             dataHoraProximaTransicao: 'isNull',
                    //             modalidadeFase: 'in:1,2',
                    //         };
                    //
                    //     }
                    //
                    //     params['filter'] = processoFilter;
                    // });

                    // this._store.dispatch(new fromStore.(params));




                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle]).then();
                })
            );
}
