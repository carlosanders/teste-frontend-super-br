import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TransicaoEditActions from '../actions/transicao-edit.actions';
import * as TransicaoListActions from '../../../transicao-list/store/actions/transicao-list.actions';

import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import {Transicao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TransicaoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Transicao with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTransicao: any =
        this._actions
            .pipe(
                ofType<TransicaoEditActions.GetTransicao>(TransicaoEditActions.GET_TRANSICAO),
                switchMap(action => this._transicaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Transicao>({data: response['entities'], schema: transicaoSchema}),
                    new TransicaoEditActions.GetTransicaoSuccess({
                        loaded: {
                            id: 'transicaoHandle',
                            value: this.routerState.params.transicaoHandle
                        },
                        transicaoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TransicaoEditActions.GetTransicaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Transicao
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTransicao: any =
        this._actions
            .pipe(
                ofType<TransicaoEditActions.SaveTransicao>(TransicaoEditActions.SAVE_TRANSICAO),
                switchMap(action => this._transicaoService.save(action.payload).pipe(
                        mergeMap((response: Transicao) => [
                            new TransicaoEditActions.SaveTransicaoSuccess(),
                            new TransicaoListActions.ReloadTransicoes(),
                            new AddData<Transicao>({data: [response], schema: transicaoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'transicao',
                                content: `Transição id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new TransicaoEditActions.SaveTransicaoFailed(err));
                        })
                    ))
            );

    /**
     * Save Transicao Success
     */
    @Effect({dispatch: false})
    saveTransicaoSuccess: any =
        this._actions
            .pipe(
                ofType<TransicaoEditActions.SaveTransicaoSuccess>(TransicaoEditActions.SAVE_TRANSICAO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.transicaoHandle), 'listar')]).then();
                })
            );
}
