import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefaListActions from '../actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Tarefa} from '@cdk/models';
import {tarefa as tarefaSchema} from '@cdk/normalizr';

@Injectable()
export class TarefaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
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
     * Get Tarefas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTarefas: any =
        this._actions
            .pipe(
                ofType<TarefaListActions.GetTarefas>(TarefaListActions.GET_TAREFAS),
                switchMap((action) => {
                    return this._tarefaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    );
                }),
                mergeMap((response) => [
                    new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
                    new TarefaListActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefaListActions.GetTarefasFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaListActions.DeleteTarefa>(TarefaListActions.DELETE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.destroy(action.payload).pipe(
                        map((response) => new TarefaListActions.DeleteTarefaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TarefaListActions.DeleteTarefaFailed(action.payload));
                        })
                    );
                })
            );

}
