import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VisibilidadeListActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models/visibilidade.model';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr/visibilidade.schema';

@Injectable()
export class VisibilidadeListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
     * Get Visibilidades with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVisibilidades: any =
        this._actions
            .pipe(
                ofType<VisibilidadeListActions.GetVisibilidades>(VisibilidadeListActions.GET_VISIBILIDADES),
                switchMap((action) => {
                    return this._processoService.getVisibilidade(
                        action.payload);
                }),
                mergeMap((response) => [
                    new AddData<Visibilidade>({data: response, schema: visibilidadeSchema}),
                    new VisibilidadeListActions.GetVisibilidadesSuccess({
                        entitiesId: response.map(visibilidade => visibilidade.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new VisibilidadeListActions.GetVisibilidadesFailed(err));
                    return caught;
                })

            );

    /**
     * Delete Visibilidade
     * @type {Observable<any>}
     */
    @Effect()
    deleteVisibilidade: any =
        this._actions
            .pipe(
                ofType<VisibilidadeListActions.DeleteVisibilidade>(VisibilidadeListActions.DELETE_VISIBILIDADE),
                mergeMap((action) => {
                    return this._processoService.destroyVisibilidade(action.payload.processoId, action.payload.visibilidadeId).pipe(
                        map((response) => new VisibilidadeListActions.DeleteVisibilidadeSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new VisibilidadeListActions.DeleteVisibilidadeFailed(action.payload));
                        })
                    );
                })
            );
}
