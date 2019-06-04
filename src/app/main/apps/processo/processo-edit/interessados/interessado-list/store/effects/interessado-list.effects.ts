import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as InteressadoListActions from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/actions';

import {InteressadoService} from '@cdk/services/interessado.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Interessado} from '@cdk/models/interessado.model';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';

@Injectable()
export class InteressadoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _interessadoService: InteressadoService,
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
     * Get Interessados with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getInteressados: any =
        this._actions
            .pipe(
                ofType<InteressadoListActions.GetInteressados>(InteressadoListActions.GET_INTERESSADOS),
                switchMap((action) => {
                    return this._interessadoService.query(
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
                    new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
                    new InteressadoListActions.GetInteressadosSuccess({
                        entitiesId: response['entities'].map(interessado => interessado.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new InteressadoListActions.GetInteressadosFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Interessado
     * @type {Observable<any>}
     */
    @Effect()
    deleteInteressado: any =
        this._actions
            .pipe(
                ofType<InteressadoListActions.DeleteInteressado>(InteressadoListActions.DELETE_INTERESSADO),
                mergeMap((action) => this._interessadoService.destroy(action.payload)),
                mergeMap((response) => [
                    // new RemoveData({id: response.id, schema: interessadoSchema}),
                    new InteressadoListActions.DeleteInteressadoSuccess(response.id)
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new InteressadoListActions.DeleteInteressadoFailed(err));
                    return caught;
                })
            );
}
