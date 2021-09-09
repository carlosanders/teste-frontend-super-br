import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as TipoAcaoWorkflowEditActions from '../actions/tipo-acao-workflow-edit.actions';
import * as TipoAcaoWorkflowListActions
    from '../../../tipo-acao-workflow-list/store/actions/tipo-acao-workflow-list.actions';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TipoAcaoWorkflowEditEffects {
    routerState: any;
    /**
     * Get TipoAcaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoAcaoWorkflow: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new TipoAcaoWorkflowEditActions.GetTipoAcaoWorkflowFailed(err));
        })
    ));
    /**
     * Save TipoAcaoWorkflow
     *
     * @type {Observable<any>}
     */
    saveTipoAcaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflow>(TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo ação workflow',
            content: 'Salvando o tipo ação workflow ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._tipoAcaoWorkflowService.save(action.payload.tipoAcaoWorkflow, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo ação workflow',
                    content: 'Tipo ação workflow id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: TipoAcaoWorkflow) => [
                    new TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowSuccess(response),
                    new TipoAcaoWorkflowListActions.ReloadTipoAcaoWorkflow(),
                    new AddData<TipoAcaoWorkflow>({data: [response], schema: tipoAcaoWorkflowSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tipo ação workflow',
                        content: 'Erro ao salvar o tipo ação workflow!',
                        status: 2, // erro
                    }));
                    return of(new TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowFailed(err));
                })
            );
        })
    ));
    /**
     * Update TipoAcaoWorkflow
     *
     * @type {Observable<any>}
     */
    updateTipoAcaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflow>(TipoAcaoWorkflowEditActions.UPDATE_TIPO_ACAO_WORKFLOW),
        switchMap(action => this._tipoAcaoWorkflowService.patch(action.payload.tipoAcaoWorkflow, action.payload.changes).pipe(
            mergeMap((response: TipoAcaoWorkflow) => [
                new TipoAcaoWorkflowListActions.ReloadTipoAcaoWorkflow(),
                new AddData<TipoAcaoWorkflow>({data: [response], schema: tipoAcaoWorkflowSchema}),
                new TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflowSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new TipoAcaoWorkflowEditActions.UpdateTipoAcaoWorkflowFailed(err));
        })
    ));
    /**
     * Save TipoAcaoWorkflow Success
     */
    saveTipoAcaoWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowEditActions.SaveTipoAcaoWorkflowSuccess>(TipoAcaoWorkflowEditActions.SAVE_TIPO_ACAO_WORKFLOW_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/tipo-acao-workflow/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
