import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {TransicaoWorkflowListReducer, TransicaoWorkflowListState} from './transicao-workflow-list.reducer';

export interface TransicaoWorkflowListAppState {
    transicaoWorkflowList: TransicaoWorkflowListState;
}

export const getTransicaoWorkflowListAppState = createFeatureSelector<TransicaoWorkflowListAppState>(
    'transicao-workflow-list'
);

export const getAppState: any = createSelector(
    getTransicaoWorkflowListAppState,
    (state: TransicaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<TransicaoWorkflowListAppState> = {
    transicaoWorkflowList: TransicaoWorkflowListReducer
};

export * from './transicao-workflow-list.reducer';
