import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Estado} from '@cdk/models';
import {EstadoService} from '@cdk/services/estado.service';
import {estado as estadoSchema} from '@cdk/normalizr';
import * as EstadosActions from '../actions';
import {Router} from '@angular/router';

@Injectable()
export class EstadosEffects {
    routerState: any;
    estados: Estado[];
    /**
     * Get Estados with router parameters
     *
     * @type {Observable<any>}
     */
    getEstados: any = createEffect(() => this._actions.pipe(
        ofType<EstadosActions.GetEstados>(EstadosActions.GET_ESTADOS),
        switchMap(() => this._estadoService.query(
            JSON.stringify({}),
            100,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        mergeMap(response => [
            new AddData<Estado>({data: response['entities'], schema: estadoSchema}),
            new EstadosActions.GetEstadosSuccess({
                entitiesId: response['entities'].map(estado => estado.id),
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new EstadosActions.GetEstadosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _estadoService: EstadoService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
