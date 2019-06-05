import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoProcessoListActions from '../actions';

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models/vinculacao-processo.model';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr/vinculacao-processo.schema';

@Injectable()
export class VinculacaoProcessoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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
     * Get VinculacoesProcessos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacoesProcessos: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoListActions.GetVinculacoesProcessos>(VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS),
                switchMap((action) => {
                    return this._vinculacaoProcessoService.query(
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
                    new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
                    new VinculacaoProcessoListActions.GetVinculacoesProcessosSuccess({
                        entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoProcessoListActions.GetVinculacoesProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete VinculacaoProcesso
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoProcesso: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoListActions.DeleteVinculacaoProcesso>(VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO),
                mergeMap((action) => {
                    return this._vinculacaoProcessoService.destroy(action.payload).pipe(
                        map((response) => new VinculacaoProcessoListActions.DeleteVinculacaoProcessoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new VinculacaoProcessoListActions.DeleteVinculacaoProcessoFailed(action.payload));
                        })
                    );
                })
            );
}
