import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TipoAcaoWorkflowReducer, TipoAcaoWorkflowState } from './tipo-acao-workflow.reducer';

export interface TipoAcaoWorkflowAppState
{
    tipoAcaoWorkflow: TipoAcaoWorkflowState;
}

export const getAcaoTriggerAppState = createFeatureSelector<TipoAcaoWorkflowAppState>(
    'configuracoes-tipo-acao-workflow-edit-app'
);

export const getAppState = createSelector(
    getAcaoTriggerAppState,
    (state: TipoAcaoWorkflowAppState) => state
);

export const reducers: ActionReducerMap<TipoAcaoWorkflowAppState> = {
    tipoAcaoWorkflow: TipoAcaoWorkflowReducer
};

export * from './tipo-acao-workflow.reducer';
