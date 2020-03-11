import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {getRouterState, State} from '../../../../../../store/reducers';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as ArquivistaClassificacaoActions from '../actions/arquivista-classificacao.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Classificacao} from '../../../../../../../@cdk/models';
import {AddData} from '../../../../../../../@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr/classificacao.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';

export class ArquivistaClassificacaoEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
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
     * Get Classificação with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getClassificacao: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoActions.GetClassificacao>(ArquivistaClassificacaoActions.GET_CLASSIFICACAO),
                switchMap((action) => {
                    return this._classificacaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Classificacao>({data: response['entities'], schema: classificacaoSchema}),
                    new ArquivistaClassificacaoActions.GetClassificacaoSuccess({
                        loaded: {
                            id: 'transicaoHandle',
                            value: this.routerState.params.transicaoHandle
                        },
                        classificacaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ArquivistaClassificacaoActions.GetClassificacaoFailed(err));
                    return caught;
                })
            );


    /**
     * Save Classificação
     * @type {Observable<any>}
     */
    @Effect()
    saveClassificacao: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoActions.SaveClassificacao>(ArquivistaClassificacaoActions.SAVE_CLASSIFICACAO),
                switchMap((action) => {
                    return this._classificacaoService.save(action.payload).pipe(
                        mergeMap((response: Classificacao) => [
                            new ArquivistaClassificacaoActions.SaveClassificacaoSuccess(),
                            new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'classificacao',
                                content: `Classificaçaõ id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            return of(new ArquivistaClassificacaoActions.SaveClassificacaoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Classificação Success
     */
    @Effect({dispatch: false})
    saveClassificacaoSuccess: any =
        this._actions
            .pipe(
                ofType<ArquivistaClassificacaoActions.SaveClassificacaoSuccess>(ArquivistaClassificacaoActions.SAVE_CLASSIFICACAO_SUCCESS),
                tap(() => {
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle]).then();
                })
            );
}
