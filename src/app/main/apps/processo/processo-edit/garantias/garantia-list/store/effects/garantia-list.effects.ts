import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as GarantiaListActions from '../actions';

import {GarantiaService} from '@cdk/services/garantia.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Garantia} from '@cdk/models';
import {garantia as garantiaSchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class GarantiaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _garantiaService: GarantiaService,
        private _store: Store<State>
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
     * Get Garantias with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getGarantias: any =
        this._actions
            .pipe(
                ofType<GarantiaListActions.GetGarantias>(GarantiaListActions.GET_GARANTIAS),
                switchMap(action => this._garantiaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context))),
                mergeMap(response => [
                    new AddData<Garantia>({data: response['entities'], schema: garantiaSchema}),
                    new GarantiaListActions.GetGarantiasSuccess({
                        entitiesId: response['entities'].map(garantia => garantia.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new GarantiaListActions.GetGarantiasFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Garantia
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteGarantia: any =
        this._actions
            .pipe(
                ofType<GarantiaListActions.DeleteGarantia>(GarantiaListActions.DELETE_GARANTIA),
                mergeMap(action => this._garantiaService.destroy(action.payload).pipe(
                        map(response => new GarantiaListActions.DeleteGarantiaSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new GarantiaListActions.DeleteGarantiaFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );
}
