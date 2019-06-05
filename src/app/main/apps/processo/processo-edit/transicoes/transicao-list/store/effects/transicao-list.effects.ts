import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TransicaoListActions from '../actions';

import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models/transicao.model';
import {transicao as transicaoSchema} from '@cdk/normalizr/transicao.schema';

@Injectable()
export class TransicaoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
        private _store: Store<State>
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
     * Get Transicoes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTransicoes: any =
        this._actions
            .pipe(
                ofType<TransicaoListActions.GetTransicoes>(TransicaoListActions.GET_TRANSICOES),
                switchMap((action) => {
                    return this._transicaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<Transicao>({data: response['entities'], schema: transicaoSchema}),
                    new TransicaoListActions.GetTransicoesSuccess({
                        entitiesId: response['entities'].map(transicao => transicao.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TransicaoListActions.GetTransicoesFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Transicao
     * @type {Observable<any>}
     */
    @Effect()
    deleteTransicao: any =
        this._actions
            .pipe(
                ofType<TransicaoListActions.DeleteTransicao>(TransicaoListActions.DELETE_TRANSICAO),
                mergeMap((action) => {
                    return this._transicaoService.destroy(action.payload).pipe(
                        map((response) => new TransicaoListActions.DeleteTransicaoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TransicaoListActions.DeleteTransicaoFailed(action.payload));
                        })
                    );
                })
            );
}
