import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {AddData} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidvalidacaoWorkflowSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import * as TipoValidacaoWorkflowActions from '../actions/tipo-validacao-workflow.actions';

@Injectable()
export class TipoValidacaoWorkflowEffects {
    routerState: any;
    /**
     * @type {Observable<any>}
     */
    getTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflow>(TipoValidacaoWorkflowActions.GET_TIPO_VALIDACAO_WORKFLOW),
        switchMap(action => this._tipoValidvalidacaoWorkflowService.query(
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
                new AddData<TipoValidacaoWorkflow>(
                    {data: response['entities'], schema: tipoValidvalidacaoWorkflowSchema}
                ),
                new TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflowSuccess({
                    entitiesId: response['entities'].map(validacao => validacao.id),
                    loaded: {
                        id: 'validacaoTransicaoWorkflowHandle',
                        value: this.routerState.params.validacaoTransicaoWorkflowHandle
                    },
                    total: response['total']
                })
            ]),
            catchError(err => of(new TipoValidacaoWorkflowActions.GetTipoValidacaoWorkflowFailed(err)))
        ))
    ));

    constructor(
        private _actions: Actions,
        private _tipoValidvalidacaoWorkflowService: TipoValidacaoWorkflowService,
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
