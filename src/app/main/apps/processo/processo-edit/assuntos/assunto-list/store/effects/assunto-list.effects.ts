import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssuntoListActions from '../actions';

import {AssuntoService} from '@cdk/services/assunto.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assunto} from '@cdk/models';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class AssuntoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _assuntoService: AssuntoService,
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
     * Get Assuntos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntos: any =
        this._actions
            .pipe(
                ofType<AssuntoListActions.GetAssuntos>(AssuntoListActions.GET_ASSUNTOS),
                switchMap(action => this._assuntoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    )),
                mergeMap(response => [
                    new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
                    new AssuntoListActions.GetAssuntosSuccess({
                        entitiesId: response['entities'].map(assunto => assunto.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoListActions.GetAssuntosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Assunto
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAssunto: any =
        this._actions
            .pipe(
                ofType<AssuntoListActions.DeleteAssunto>(AssuntoListActions.DELETE_ASSUNTO),
                mergeMap(action => this._assuntoService.destroy(action.payload).pipe(
                        map(response => new AssuntoListActions.DeleteAssuntoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new AssuntoListActions.DeleteAssuntoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );
}
