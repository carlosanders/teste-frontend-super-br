import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as fromStore from '../index';
import * as fromStoreList from '../../../vinculacao-especie-processo-workflow-list/store/index';
import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {vinculacaoEspecieProcessoWorkflow as vinculacaoEspecieProcessoWorkflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {VinculacaoEspecieProcessoWorkflow} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoEspecieProcessoWorkflowEditEffects {
    routerState: any;

    /**
     * Get VinculacaoEspecieProcessoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoEspecieProcessoWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetVinculacaoEspecieProcessoWorkflow>(fromStore.GET_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW),
        switchMap(action => this._vinculacaoEspecieProcessoWorkflow.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<VinculacaoEspecieProcessoWorkflow>({data: response['entities'], schema: vinculacaoEspecieProcessoWorkflowSchema}),
            new fromStore.GetVinculacaoEspecieProcessoWorkflowSuccess({
                loaded: {
                    id: 'vinculacaoEspecieProcessoWorkflowHandle',
                    value: this.routerState.params['vinculacaoEspecieProcessoWorkflowHandle']
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError(err => of(new fromStore.GetVinculacaoEspecieProcessoWorkflowFailed(err)))
    ));
    
    /**
     * Save VinculacaoEspecieProcessoWorkflow
     *
     * @type {Observable<any>}
     */
    saveVinculacaoEspecieProcessoWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVinculacaoEspecieProcessoWorkflow>(fromStore.SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação de espécie de processo com o workflow',
            content: 'Salvando a espécie de processo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoEspecieProcessoWorkflow.save(action.payload.vinculacaoEspecieProcessoWorkflow).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação de espécie de processo com o workflow',
                content: 'Vinculação de espécie de processo com o workflow id ' + response.id + ' alterada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoEspecieProcessoWorkflow) => [
                new SetData<VinculacaoEspecieProcessoWorkflow>({data: [response], schema: vinculacaoEspecieProcessoWorkflowSchema}),
                new fromStoreList.UnloadVinculacaoEspecieProcessoWorkflow(),
                new fromStore.SaveVinculacaoEspecieProcessoWorkflowSuccess(response),
                new AddData<VinculacaoEspecieProcessoWorkflow>({data: [response], schema: vinculacaoEspecieProcessoWorkflowSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação de espécie de processo com o workflow',
                    content: 'Erro ao alterar a vinculação da espécie de processo do workflow!',
                    status: 2, // erro
                }));
                return of(new fromStore.SaveVinculacaoEspecieProcessoWorkflowFailed(err));
            })
        ))
    ));
    
    /**
     * Save VinculacaoEspecieProcessoWorkflow Success
     */
    saveVinculacaoEspecieProcessoWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.SaveVinculacaoEspecieProcessoWorkflowSuccess>(fromStore.SAVE_VINCULACAO_ESPECIE_PROCESSO_WORKFLOW_SUCCESS),
        tap(() => {
            this._router.navigate([this._router.url.replace('editar/criar', 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoEspecieProcessoWorkflow: VinculacaoEspecieProcessoWorkflowService,
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
