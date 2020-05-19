import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as SigiloListActions from '../actions';

import {SigiloService} from '@cdk/services/sigilo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Sigilo} from '@cdk/models';
import {sigilo as sigiloSchema} from '@cdk/normalizr/sigilo.schema';

@Injectable()
export class SigiloListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _sigiloService: SigiloService,
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
     * Get Sigilos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSigilos: any =
        this._actions
            .pipe(
                ofType<SigiloListActions.GetSigilos>(SigiloListActions.GET_SIGILOS),
                switchMap((action) => {
                    return this._sigiloService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context));
                }),
                mergeMap((response) => [
                    new AddData<Sigilo>({data: response['entities'], schema: sigiloSchema}),
                    new SigiloListActions.GetSigilosSuccess({
                        entitiesId: response['entities'].map(sigilo => sigilo.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new SigiloListActions.GetSigilosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Sigilo
     * @type {Observable<any>}
     */
    @Effect()
    deleteSigilo: any =
        this._actions
            .pipe(
                ofType<SigiloListActions.DeleteSigilo>(SigiloListActions.DELETE_SIGILO),
                mergeMap((action) => {
                    return this._sigiloService.destroy(action.payload).pipe(
                        map((response) => new SigiloListActions.DeleteSigiloSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new SigiloListActions.DeleteSigiloFailed(action.payload));
                        })
                    );
                })
            );

}
