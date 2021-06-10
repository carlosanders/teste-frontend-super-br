import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ValidacaoTransicaoWorkflowListReducer, ValidacaoTransicaoWorkflowListState } from './validacao-transicao-workflow-list.reducer';

export interface ValidacaoTransicaoWorkflowListAppState
{
    validacaoTransicaoWorkflowList: ValidacaoTransicaoWorkflowListState;
}

export const getValidacaoTransicaoWorkflowListAppState = createFeatureSelector<ValidacaoTransicaoWorkflowListAppState>(
    'admin-validacao-transicao-workflow-list-app'
);

export const getAppState = createSelector(
    getValidacaoTransicaoWorkflowListAppState,
    (state: ValidacaoTransicaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<ValidacaoTransicaoWorkflowListAppState> = {
    validacaoTransicaoWorkflowList: ValidacaoTransicaoWorkflowListReducer
};

export * from './validacao-transicao-workflow-list.reducer';
