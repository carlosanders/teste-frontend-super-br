import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as fromStore from '../index';
import * as fromStoreList from '../../../sub-workflow-list/store';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoTransicaoWorkflow as vinculacaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {VinculacaoTransicaoWorkflow} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoTransicaoWorkflowEffects {
    routerState: any;
    
    saveVinculacaoTransicaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVinculacaoTransicaoWorkflow>(fromStore.SAVE_VINCULACAO_TRANSICAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação transição workflow',
            content: 'Salvando a vinculação transição workflow ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            const populate = JSON.stringify(['workflow']);
            return this._vinculacaoTransicaoWorkflowService.save(action.payload.vinculacaoTransicaoWorkflow, context, populate).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação transição workflow',
                    content: 'Vinculação da transição do workflow id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap(response => [
                    new AddData<VinculacaoTransicaoWorkflow>({data: [response], schema: vinculacaoTransicaoWorkflowSchema}),
                    new fromStore.SaveVinculacaoTransicaoWorkflowSuccess(action.payload.vinculacaoTransicaoWorkflow),
                    new fromStoreList.UnloadVinculacaoTransicaoWorkflowFailed()
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação transição workflow',
                        content: 'Erro ao salvar a vinculação transição workflow!',
                        status: 2, // erro
                    }));
                    return of(new fromStore.SaveVinculacaoTransicaoWorkflowFailed(err));
                })
            );
        })
    ));

    saveVinculacaoTransicaoWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVinculacaoTransicaoWorkflowSuccess>(fromStore.SAVE_VINCULACAO_TRANSICAO_WORKFLOW_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace('/editar/criar', '/listar')]).then();
        })
    ), {dispatch: false});

    constructor(private _actions: Actions,
                private _vinculacaoTransicaoWorkflowService: VinculacaoTransicaoWorkflowService,
                private _store: Store<State>,
                private _router: Router)
    {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
