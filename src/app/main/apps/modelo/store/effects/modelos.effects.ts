import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap, mergeMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModelosActions from 'app/main/apps/modelo/store/actions/modelos.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';

@Injectable()
export class ModelosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
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
     * Get Modelos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getModelos: any =
        this._actions
            .pipe(
                ofType<ModelosActions.GetModelos>(ModelosActions.GET_MODELOS),
                switchMap((action) => {
                    return this._modeloService.search(
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
                    new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                    new ModelosActions.GetModelosSuccess({
                        entitiesId: response['entities'].map(modelo => modelo.id),
                        loaded: {
                            id: this.routerState.params.tarefaHandle ? 'tarefaHandle' : 'processoHandle',
                            value: this.routerState.params.tarefaHandle ? this.routerState.params.tarefaHandle : this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new ModelosActions.GetModelosFailed(err));
                    return caught;
                })

            );
}
