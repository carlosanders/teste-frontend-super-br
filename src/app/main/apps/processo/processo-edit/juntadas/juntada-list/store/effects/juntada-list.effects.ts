import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as JuntadaListActions from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/actions';

import {JuntadaService} from '@cdk/services/juntada.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models/juntada.model';
import {juntada as juntadaSchema} from '@cdk/normalizr/juntada.schema';

@Injectable()
export class JuntadaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
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
     * Get Juntadas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getJuntadas: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.GetJuntadas>(JuntadaListActions.GET_JUNTADAS),
                switchMap((action) => {
                    return this._juntadaService.query(
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
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new JuntadaListActions.GetJuntadasSuccess({
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new JuntadaListActions.GetJuntadasFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Juntada
     * @type {Observable<any>}
     */
    @Effect()
    deleteJuntada: any =
        this._actions
            .pipe(
                ofType<JuntadaListActions.DeleteJuntada>(JuntadaListActions.DELETE_JUNTADA),
                mergeMap((action) => {
                    return this._juntadaService.destroy(action.payload).pipe(
                        map((response) => new JuntadaListActions.DeleteJuntadaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new JuntadaListActions.DeleteJuntadaFailed(action.payload));
                        })
                    );
                })
            );
}
