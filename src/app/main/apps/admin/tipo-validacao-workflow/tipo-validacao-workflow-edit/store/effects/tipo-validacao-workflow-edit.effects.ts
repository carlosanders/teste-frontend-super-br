import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';
import * as TipoValidacaoWorkflowEditActions from '../actions/tipo-validacao-workflow-edit.actions';
import * as TipoValidacaoWorkflowListActions from '../../../tipo-validacao-workflow-list/store/actions/tipo-validacao-workflow-list.actions';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import {colaborador as colaboradorSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow, Colaborador} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class TipoValidacaoWorkflowEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService,
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
     * Get TipoValidacaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTipoValidacaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowEditActions.GetTipoValidacaoWorkflow>(TipoValidacaoWorkflowEditActions.GET_TIPO_VALIDACAO_WORKFLOW),
                switchMap(action => this._tipoValidacaoWorkflowService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<TipoValidacaoWorkflow>({data: response['entities'], schema: tipoValidacaoWorkflowSchema}),
                    new TipoValidacaoWorkflowEditActions.GetTipoValidacaoWorkflowSuccess({
                        loaded: {
                            id: 'tipoValidacaoWorkflowHandle',
                            value: this.routerState.params.tipoValidacaoWorkflowHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoValidacaoWorkflowEditActions.GetTipoValidacaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoValidacaoWorkflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTipoValidacaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflow>(TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._tipoValidacaoWorkflowService.save(action.payload, context).pipe(
                        mergeMap((response: TipoValidacaoWorkflow) => [
                            new TipoValidacaoWorkflowListActions.ReloadTipoValidacaoWorkflow(),
                            new AddData<TipoValidacaoWorkflow>({data: [response], schema: tipoValidacaoWorkflowSchema}),
                            new TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Update TipoValidacaoWorkflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateTipoValidacaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflow>(TipoValidacaoWorkflowEditActions.UPDATE_TIPO_VALIDACAO_WORKFLOW),
                switchMap(action => this._tipoValidacaoWorkflowService.patch(action.payload.tipoValidacaoWorkflow, action.payload.changes).pipe(
                        mergeMap((response: TipoValidacaoWorkflow) => [
                            new TipoValidacaoWorkflowListActions.ReloadTipoValidacaoWorkflow(),
                            new AddData<TipoValidacaoWorkflow>({data: [response], schema: tipoValidacaoWorkflowSchema}),
                            new TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflowSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save TipoValidacaoWorkflow Success
     */
    @Effect({dispatch: false})
    saveTipoValidacaoWorkflowSuccess: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowSuccess>(TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/tipo-validacao-workflow-edit/listar']).then();
                })
            );


}
