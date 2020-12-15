import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AcaoTransicaoWorkflowListReducer, AcaoTransicaoWorkflowListState } from './acao-transicao-workflow-list.reducer';

export interface AcaoTransicaoWorkflowListAppState
{
    acaoList: AcaoTransicaoWorkflowListState;
}

export const getAcaoTransicaoWorkflowListAppState = createFeatureSelector<AcaoTransicaoWorkflowListAppState>(
    'admin-acao-transicao-workflow-list-app'
);

export const getAppState = createSelector(
    getAcaoTransicaoWorkflowListAppState,
    (state: AcaoTransicaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<AcaoTransicaoWorkflowListAppState> = {
    acaoList: AcaoTransicaoWorkflowListReducer
};

export * from './acao-transicao-workflow-list.reducer';
