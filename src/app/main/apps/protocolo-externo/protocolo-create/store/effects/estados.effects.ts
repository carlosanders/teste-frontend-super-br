import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Estado} from '@cdk/models';
import {EstadoService} from '@cdk/services/estado.service';
import {estado as estadoSchema} from '@cdk/normalizr/estado.schema';
import * as EstadosActions from '../actions';
import {Router} from '@angular/router';

@Injectable()
export class EstadosEffects {
    routerState: any;
    estados: Estado[];

    constructor(
        private _actions: Actions,
        private _estadoService: EstadoService,
        private _router: Router,
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
     * Get Estados with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEstados: any =
        this._actions
            .pipe(
                ofType<EstadosActions.GetEstados>(EstadosActions.GET_ESTADOS),
                switchMap(() => {
                    return this._estadoService.query(
                        JSON.stringify({}),
                        100,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<Estado>({data: response['entities'], schema: estadoSchema}),
                    new EstadosActions.GetEstadosSuccess({
                        entitiesId: response['entities'].map(estado => estado.id),
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new EstadosActions.GetEstadosFailed(err));
                    return caught;
                })
            );
}
