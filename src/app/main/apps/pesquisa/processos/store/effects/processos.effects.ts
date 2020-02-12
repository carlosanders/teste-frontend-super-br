import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessosActions from 'app/main/apps/pesquisa/processos/store/actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData, } from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models/processo.model';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';

@Injectable()
export class ProcessosEffect {
    
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
     * Get Processos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getProcessos: any =
        this._actions
            .pipe(
                ofType<ProcessosActions.GetProcessos>(ProcessosActions.GET_PROCESSOS),
                switchMap((action) => {
                    return this._processoService.query(
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
                    new AddData<Processo>({data: response['entities'], schema: processoSchema}),
                    new ProcessosActions.GetProcessosSuccess({
                        entitiesId: response['entities'].map(processo => processo.id),
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new ProcessosActions.GetProcessosFailed(err));
                    return caught;
                })

            );
}
