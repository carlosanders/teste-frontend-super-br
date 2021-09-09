import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as HistoricoListActions from '../actions';

import {HistoricoService} from '@cdk/services/historico.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Historico} from '@cdk/models';
import {historico as historicoSchema} from '@cdk/normalizr';

@Injectable()
export class HistoricoListEffects {
    routerState: any;
    /**
     * Get Historicos with router parameters
     *
     * @type {Observable<any>}
     */
    getHistoricos: any = createEffect(() => this._actions.pipe(
        ofType<HistoricoListActions.GetHistoricos>(HistoricoListActions.GET_HISTORICOS),
        switchMap(action => this._historicoService.query(
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
            new AddData<Historico>({data: response['entities'], schema: historicoSchema}),
            new HistoricoListActions.GetHistoricosSuccess({
                entitiesId: response['entities'].map(historico => historico.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new HistoricoListActions.GetHistoricosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _historicoService: HistoricoService,
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
