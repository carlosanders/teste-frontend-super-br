import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RegraListActions from '../actions';

import {RegraService} from '@cdk/services/regra.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Regra} from '@cdk/models';
import {regra as regraSchema} from '@cdk/normalizr';

@Injectable()
export class RegraListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _regraService: RegraService,
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
     * Get Regras with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRegras: any =
        this._actions
            .pipe(
                ofType<RegraListActions.GetRegras>(RegraListActions.GET_REGRAS),
                switchMap((action) => {
                    return this._regraService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Regra>({data: response['entities'], schema: regraSchema}),
                            new RegraListActions.GetRegrasSuccess({
                                entitiesId: response['entities'].map(regra => regra.id),
                                loaded: {
                                    id: 'etiquetaHandle',
                                    value: this.routerState.params.etiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RegraListActions.GetRegrasFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Regra
     * @type {Observable<any>}
     */
    @Effect()
    deleteRegra: any =
        this._actions
            .pipe(
                ofType<RegraListActions.DeleteRegra>(RegraListActions.DELETE_REGRA),
                mergeMap((action) => {
                    return this._regraService.destroy(action.payload).pipe(
                        map((response) => new RegraListActions.DeleteRegraSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new RegraListActions.DeleteRegraFailed(action.payload));
                        })
                    );
                })
            );
}
