import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import * as TipoAcaoWorkflowActions from '../actions/tipo-acao-workflow.actions';

@Injectable()
export class TipoAcaoWorkflowEffects {
    routerState: any;
    /**
     * @type {Observable<any>}
     */
    getTipoAcaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowActions.GetTipoAcaoWorkflow>(TipoAcaoWorkflowActions.GET_TIPO_ACAO_WORKFLOW),
        switchMap(action => this._tipoAcaoWorkflowService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify({isAdmin: true})
        ).pipe(
            mergeMap(response => [
                new AddData<TipoAcaoWorkflow>(
                    {data: response['entities'], schema: tipoAcaoWorkflowSchema}
                ),
                new TipoAcaoWorkflowActions.GetTipoAcaoWorkflowSuccess({
                    entitiesId: response['entities'].map(acao => acao.id),
                    loaded: {
                        id: 'acaoTransicaoWorkflowHandle',
                        value: this.routerState.params.acaoTransicaoWorkflowHandle
                    },
                    total: response['total']
                })
            ]),
            catchError(err => of(new TipoAcaoWorkflowActions.GetTipoAcaoWorkflowFailed(err)))
        ))
    ));

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
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
