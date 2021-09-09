import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as TipoValidacaoWorkflowEditActions from '../actions/tipo-validacao-workflow-edit.actions';
import * as TipoValidacaoWorkflowListActions
    from '../../../tipo-validacao-workflow-list/store/actions/tipo-validacao-workflow-list.actions';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TipoValidacaoWorkflowEditEffects {
    routerState: any;

    /**
     * Get TipoValidacaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
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
            new AddData<TipoValidacaoWorkflow>({
                data: response['entities'],
                schema: tipoValidacaoWorkflowSchema
            }),
            new TipoValidacaoWorkflowEditActions.GetTipoValidacaoWorkflowSuccess({
                loaded: {
                    id: 'tipoValidacaoWorkflowHandle',
                    value: this.routerState.params.tipoValidacaoWorkflowHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TipoValidacaoWorkflowEditActions.GetTipoValidacaoWorkflowFailed(err));
        })
    ));

    /**
     * Save TipoValidacaoWorkflow
     *
     * @type {Observable<any>}
     */
    saveTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflow>(TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo de validação do workflow',
            content: 'Salvando o tipo de validação do workflow ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._tipoValidacaoWorkflowService.save(action.payload.tipoValidacaoWorkflow, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo de validação do workflow',
                    content: 'Tipo de validação do workflow id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: TipoValidacaoWorkflow) => [
                    new TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowSuccess(response),
                    new TipoValidacaoWorkflowListActions.ReloadTipoValidacaoWorkflow(),
                    new AddData<TipoValidacaoWorkflow>({data: [response], schema: tipoValidacaoWorkflowSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tipo de validação do workflow',
                        content: 'Erro ao salvar o tipo de validação do workflow!',
                        status: 2, // erro
                    }));
                    return of(new TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowFailed(err));
                })
            );
        })
    ));

    /**
     * Update TipoValidacaoWorkflow
     *
     * @type {Observable<any>}
     */
    updateTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflow>(TipoValidacaoWorkflowEditActions.UPDATE_TIPO_VALIDACAO_WORKFLOW),
        switchMap(action => this._tipoValidacaoWorkflowService.patch(action.payload.tipoValidacaoWorkflow, action.payload.changes).pipe(
            mergeMap((response: TipoValidacaoWorkflow) => [
                new TipoValidacaoWorkflowListActions.ReloadTipoValidacaoWorkflow(),
                new AddData<TipoValidacaoWorkflow>({data: [response], schema: tipoValidacaoWorkflowSchema}),
                new TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflowSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new TipoValidacaoWorkflowEditActions.UpdateTipoValidacaoWorkflowFailed(err));
        })
    ));

    /**
     * Save TipoValidacaoWorkflow Success
     */
    saveTipoValidacaoWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowEditActions.SaveTipoValidacaoWorkflowSuccess>(TipoValidacaoWorkflowEditActions.SAVE_TIPO_VALIDACAO_WORKFLOW_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/tipo-validacao-workflow/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService,
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
