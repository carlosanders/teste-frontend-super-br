import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';
import * as TipoAcaoWorkflowEditActions from '../actions/tipo-acao-workflow-edit.actions';
import * as TipoAcaoWorkflowListActions from '../../../tipo-acao-workflow-list/store/actions/tipo-acao-workflow-list.actions';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {colaborador as colaboradorSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow, Colaborador} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TipoAcaoWorkflowEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get TipoAcaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowEditActions.GetTipoAcaoWorkflow>(TipoAcaoWorkflowEditActions.GET_TIPO_ACAO_WORKFLOW),
                switchMap(action => this._tipoAcaoWorkflowService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<TipoAcaoWorkflow>({data: response['entities'], schema: tipoAcaoWorkflowSchema}),
                    new TipoAcaoWorkflowEditActions.GetTipoAcaoWorkflowSuccess({
                        loaded: {
                            id: 'tipoAcaoWorkflowHandle',
                            value: this.routerState.params.tipoAcaoWorkflowHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoAcaoWorkflowEditActions.GetTipoAcaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoAcaoWorkflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflow>(TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._tipoAcaoWorkflowService.save(action.payload, context).pipe(
                        mergeMap((response: TipoAcaoWorkflow) => [
                            new TipoAcaoWorkflowListActions.ReloadTipoAcaoWorkflow(),
                            new AddData<TipoAcaoWorkflow>({data: [response], schema: tipoAcaoWorkflowSchema}),
                            new TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Update TipoAcaoWorkflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflow>(TipoAcaoWorkflowEditActions.UPDATE_TIPO_ACAO_WORKFLOW),
                switchMap(action => this._tipoAcaoWorkflowService.patch(action.payload.tipoAcaoWorkflow, action.payload.changes).pipe(
                        mergeMap((response: TipoAcaoWorkflow) => [
                            new TipoAcaoWorkflowListActions.ReloadTipoAcaoWorkflow(),
                            new AddData<TipoAcaoWorkflow>({data: [response], schema: tipoAcaoWorkflowSchema}),
                            new TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflowSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoAcaoWorkflow Success
     */
    @Effect({dispatch: false})
    saveTipoAcaoWorkflowSuccess: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowSuccess>(TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/tipo-acao-workflow/listar']).then();
                })
            );


}
