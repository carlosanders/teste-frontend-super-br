import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from 'app/main/apps/pesquisa/processos/store/actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData,} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';

@Injectable()
export class ProcessosEffect {

    routerState: any;
    /**
     * Get Processos with router parameters
     *
     * @type {Observable<any>}
     */
    getProcessos: any = createEffect(() => this._actions.pipe(
        ofType<ProcessosActions.GetProcessos>(ProcessosActions.GET_PROCESSOS),
        switchMap(action => this._processoService.search(
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
            new AddData<Processo>({data: response['entities'], schema: processoSchema}),
            new ProcessosActions.GetProcessosSuccess({
                entitiesId: response['entities'].map(processo => processo.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessosActions.GetProcessosFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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
