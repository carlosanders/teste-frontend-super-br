import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store';
import * as fromStore from '../index';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData, RemoveData} from '@cdk/ngrx-normalizr';
import {VinculacaoEspecieProcessoWorkflow} from '@cdk/models';
import {
    vinculacaoEspecieProcessoWorkflow as vinculacaoEspecieProcessoWorkflowSchema
} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {
    VinculacaoEspecieProcessoWorkflowService
} from '@cdk/services/vinculacao-especie-processo-workflow.service';

@Injectable()
export class VinculacaoEspecieProcessoWorkflowListEffects {

    routerState: any;

    /**
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoEspecieProcessoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetVinculacaoEspecieProcessoWorkflow>(fromStore.GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW),
        switchMap(action => this._vinculacaoEspecieProcessoWorkflowService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<VinculacaoEspecieProcessoWorkflow>({data: response['entities'], schema: vinculacaoEspecieProcessoWorkflowSchema}),
                new fromStore.GetVinculacaoEspecieProcessoWorkflowSuccess({
                    entitiesId: response['entities'].map(vinculacaoEspecieProcessoWorkflow => vinculacaoEspecieProcessoWorkflow.id),
                    loaded: {
                        id: 'workflowHandle',
                        value: this.routerState.params['workflowHandle']
                    },
                    total: response['total']

                })
            ]),
            catchError(err => of(new fromStore.GetVinculacaoEspecieProcessoWorkflowFailed(err)))
        ))
    ));

    /**
     * Delete EspecieProcesso
     *
     * @type {Observable<any>}
     */
    destroyVinculacaoEspecieProcessoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteVinculacaoEspecieProcessoWorkflow>(fromStore.DELETE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'Vinculação Espécie Processo',
            content: 'Apagando vinculação espécie processo id ' + action.payload.vinculacaoEspecieProcessoWorkflow.id + '...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoEspecieProcessoWorkflowService.destroy(action.payload.vinculacaoEspecieProcessoWorkflow.id).pipe(
            map((response: VinculacaoEspecieProcessoWorkflow) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'Vinculação Espécie Processo',
                    content: 'Vinculação Espécie Processo id ' + action.payload.vinculacaoEspecieProcessoWorkflow.id + ' deletado com sucesso.',
                    status: 1, // sucesso
                }));
                this._store.dispatch(new AddData<VinculacaoEspecieProcessoWorkflow>({
                    data: [response],
                    schema: vinculacaoEspecieProcessoWorkflowSchema,
                }));
                return new fromStore.DeleteVinculacaoEspecieProcessoWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoEspecieProcessoWorkflow.id,
                    error: err
                };
                console.log(err);
                return of(new fromStore.DeleteVinculacaoEspecieProcessoWorkflowFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoEspecieProcessoWorkflowService: VinculacaoEspecieProcessoWorkflowService,
        private _loginService: LoginService,
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
