import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RegraEtiquetaListActions from '../actions';

import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';

@Injectable()
export class RegraEtiquetaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _regraEtiquetaService: RegraEtiquetaService,
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
     * Get RegrasEtiqueta with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRegrasEtiqueta: any =
        this._actions
            .pipe(
                ofType<RegraEtiquetaListActions.GetRegrasEtiqueta>(RegraEtiquetaListActions.GET_REGRAS_ETIQUETA),
                switchMap((action) => {
                    return this._regraEtiquetaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<RegraEtiqueta>({data: response['entities'], schema: regraEtiquetaSchema}),
                            new RegraEtiquetaListActions.GetRegrasEtiquetaSuccess({
                                entitiesId: response['entities'].map(regraEtiqueta => regraEtiqueta.id),
                                loaded: {
                                    id: 'etiquetaHandle',
                                    value: this.routerState.params.etiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RegraEtiquetaListActions.GetRegrasEtiquetaFailed(err));
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
                ofType<RegraEtiquetaListActions.DeleteRegraEtiqueta>(RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA),
                mergeMap((action) => {
                    return this._regraEtiquetaService.destroy(action.payload).pipe(
                        map((response) => new RegraEtiquetaListActions.DeleteRegraEtiquetaSuccess(response.id)),
                        catchError((err) => {
                            console.log (err);
                            return of(new RegraEtiquetaListActions.DeleteRegraEtiquetaFailed(action.payload));
                        })
                    );
                })
            );
}
