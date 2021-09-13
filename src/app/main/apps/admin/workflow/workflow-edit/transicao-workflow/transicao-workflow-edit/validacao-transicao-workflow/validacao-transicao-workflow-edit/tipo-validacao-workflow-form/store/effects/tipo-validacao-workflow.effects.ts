import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';


import {AddData} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as schema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import * as TipoValidacaoWorkflowActions from '../actions';

@Injectable()
export class TipoValidacaoWorkflowEffects {
    routerState: any;
    /**
     * @type {Observable<any>}
     */
    getTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
            ofType<TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflow>(TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW),
            switchMap(action => this._tipoValidacaoWorkflowService.query(
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
                new AddData<TipoValidacaoWorkflow>({data: response['entities'], schema: schema}),
                new TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflowSuccess({
                    loaded: {
                        id: response['entities'][0].id,
                        value: response['entities'][0].sigla
                    },
                    entityId: response['entities'][0].id
                })
            ]),
            catchError((err, caught) => {
                this._store.dispatch(new TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflowFailed(err));
                return caught;
            })
        )
    );

    constructor(
        private _actions: Actions,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
