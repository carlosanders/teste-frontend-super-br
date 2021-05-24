import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as schema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import * as TipoAcaoWorkflowActions from '../actions';

@Injectable()
export class TipoAcaoWorkflowEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
        private _store: Store<State>,
        private _router: Router
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
     * @type {Observable<any>}
     */
    @Effect()
    getTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowActions.GetTipoAcaoWorkflow>(TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW),
                switchMap(action => this._tipoAcaoWorkflowService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true})
                    )),
                switchMap(response => [
                    new AddData<TipoAcaoWorkflow>({data: response['entities'], schema: schema}),
                    new TipoAcaoWorkflowActions.GetTipoAcaoWorkflowSuccess({
                        loaded: {
                            id:response['entities'][0].id,
                            value: response['entities'][0].trigger
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new TipoAcaoWorkflowActions.GetTipoAcaoWorkflowFailed(err));
                    return caught;
                })
            );
}
