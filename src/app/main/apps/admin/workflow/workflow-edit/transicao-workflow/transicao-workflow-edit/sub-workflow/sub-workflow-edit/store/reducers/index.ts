import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoTransicaoWorkflowReducer, VinculacaoTransicaoWorkflowState} from './vinculacao-transicao-workflow.reducer';

export interface VinculacaoTransicaoWorkflowAppState {
    vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflowState;
}

export const getVinculacaoTransicaoWorkflowAppState = createFeatureSelector<VinculacaoTransicaoWorkflowAppState>(
    'vinculacao-transicao-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoTransicaoWorkflowAppState,
    (state: VinculacaoTransicaoWorkflowAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoTransicaoWorkflowAppState> = {
    vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflowReducer
};

export * from './vinculacao-transicao-workflow.reducer';
