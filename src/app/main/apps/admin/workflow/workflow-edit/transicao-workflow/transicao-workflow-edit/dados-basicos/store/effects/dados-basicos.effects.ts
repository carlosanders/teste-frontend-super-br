import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DadosBasicosActions from '../actions/dados-basicos.actions';
import * as TransicaoWorkflowListActions
    from '../../../../transicao-workflow-list/store/actions/transicao-workflow-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {TransicaoWorkflow} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DadosBasicosEffects {
    routerState: any;
    /**
     * Save Workflow
     *
     * @type {Observable<any>}
     */
    saveWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.SaveTransicaoWorkflow>(DadosBasicosActions.SAVE_TRANSICAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'transição workflow',
            content: 'Salvando a transição workflow ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            const populate = JSON.stringify(['workflow']);
            return this._transicaoWorkflowService.save(action.payload.transicaoWorkflow, context, populate).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'transição workflow',
                    content: 'Transição workflow id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap(response => [
                    new AddData<TransicaoWorkflow>({data: [response], schema: transicaoWorkflowSchema}),
                    new TransicaoWorkflowListActions.UnloadTransicaoWorkflow(),
                    new DadosBasicosActions.SaveTransicaoWorkflowSuccess(action.payload.transicaoWorkflow),
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'transição workflow',
                        content: 'Erro ao salvar a transição workflow!',
                        status: 2, // erro
                    }));
                    return of(new DadosBasicosActions.SaveTransicaoWorkflowFailed(err));
                })
            );
        })
    ));
    /**
     * Save Workflow Success
     */
    saveWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DadosBasicosActions.SaveTransicaoWorkflowSuccess>(DadosBasicosActions.SAVE_TRANSICAO_WORKFLOW_SUCCESS),
        tap((action) => {
            this._router.navigate(['apps/admin/workflows/editar/' + action.payload.workflow.id + '/transicoes/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _transicaoWorkflowService: TransicaoWorkflowService,
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
