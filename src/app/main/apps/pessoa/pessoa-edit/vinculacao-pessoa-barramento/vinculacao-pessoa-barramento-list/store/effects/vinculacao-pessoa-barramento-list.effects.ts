import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoPessoaBarramentoListActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramentoService} from "@cdk/services/vinculacao-pessoa-barramento.service";
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";

@Injectable()
export class VinculacaoPessoaBarramentoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService,
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
     * Get VinculacaoPessoaBarramentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoPessoaBarramentos: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentos>(VinculacaoPessoaBarramentoListActions.GET_VINCULACAO_PESSOA_BARRAMENTOS),
                switchMap((action) => {
                    return this._vinculacaoPessoaBarramentoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap((response) => [
                    new AddData<VinculacaoPessoaBarramento>({data: response['entities'], schema: vinculacaoPessoaBarramentoSchema}),
                    new VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentosSuccess({
                        entitiesId: response['entities'].map(vinculacaoPessoaBarramento => vinculacaoPessoaBarramento.id),
                        loaded: {
                            id: 'pessoaHandle',
                            value: this.routerState.params.pessoaHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete VinculacaoPessoaBarramento
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoPessoaBarramento: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoListActions.DELETE_VINCULACAO_PESSOA_BARRAMENTO),
                mergeMap((action) => {
                    return this._vinculacaoPessoaBarramentoService.destroy(action.payload).pipe(
                        map((response) => new VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramentoSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramentoFailed(action.payload));
                        })
                    );
                })
            );
}
