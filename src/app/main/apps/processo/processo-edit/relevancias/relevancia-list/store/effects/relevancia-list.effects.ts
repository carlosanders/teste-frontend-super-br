import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelevanciaListActions from '../actions';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Relevancia} from '@cdk/models';
import {relevancia as relevanciaSchema} from '@cdk/normalizr/relevancia.schema';

@Injectable()
export class RelevanciaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _relevanciaService: RelevanciaService,
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
     * Get Relevancias with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRelevancias: any =
        this._actions
            .pipe(
                ofType<RelevanciaListActions.GetRelevancias>(RelevanciaListActions.GET_RELEVANCIAS),
                switchMap((action) => {
                    return this._relevanciaService.query(
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
                    new AddData<Relevancia>({data: response['entities'], schema: relevanciaSchema}),
                    new RelevanciaListActions.GetRelevanciasSuccess({
                        entitiesId: response['entities'].map(relevancia => relevancia.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new RelevanciaListActions.GetRelevanciasFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Relevancia
     * @type {Observable<any>}
     */
    @Effect()
    deleteRelevancia: any =
        this._actions
            .pipe(
                ofType<RelevanciaListActions.DeleteRelevancia>(RelevanciaListActions.DELETE_RELEVANCIA),
                mergeMap((action) => {
                    return this._relevanciaService.destroy(action.payload).pipe(
                        map((response) => new RelevanciaListActions.DeleteRelevanciaSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new RelevanciaListActions.DeleteRelevanciaFailed(action.payload));
                        })
                    );
                })
            );
}
