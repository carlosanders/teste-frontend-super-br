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
     * Get Transicao with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTransicao: any =
        this._actions
            .pipe(
                ofType<RealizarTransicoesActions.GetTransicao>(RealizarTransicoesActions.GET_TRANSICAO),
                switchMap((action) => {
                    return this._transicaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Transicao>({data: response['entities'], schema: transicaoSchema}),
                    new RealizarTransicoesActions.GetTransicaoSuccess({
                        loaded: {
                            id: 'transicaoHandle',
                            value: this.routerState.params.transicaoHandle
                        },
                        transicaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RealizarTransicoesActions.GetTransicaoFailed(err));
                    return caught;
                })
            );


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
                    this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' +
                    this.routerState.params.typeHandle]).then();
                })
            );
}
