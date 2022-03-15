import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModelosActions from '../actions/modelos.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';

@Injectable()
export class ModelosEffect {
    routerState: any;

    /**
     * Get Modelos with router parameters
     *
     * @type {Observable<any>}
     */
    getModelos: any = createEffect(() => this._actions.pipe(
            ofType<ModelosActions.GetModelos>(ModelosActions.GET_MODELOS),
            switchMap((action) => {
                const filters = {
                    ...action.payload.filter,
                    ...action.payload.gridFilter,
                };
                const mode = 'search';
                return this._modeloService[`${mode}`](
                    JSON.stringify(filters),
                    action.payload.limit,
                    action.payload.offset,
                    JSON.stringify(action.payload.sort),
                    JSON.stringify(action.payload.populate));
            }),
            mergeMap(response => [
                new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                new ModelosActions.GetModelosSuccess({
                    entitiesId: response['entities'].map(modelo => modelo.id),
                    loaded: {
                        id: 'modelo-bloco',
                        value: 'modelo-bloco'
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ModelosActions.GetModelosFailed(err));
            })
        )
    );

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
