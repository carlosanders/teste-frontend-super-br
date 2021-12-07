import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AcaoTransicaoWorkflowListReducer, AcaoTransicaoWorkflowListState} from './acao-transicao-workflow-list.reducer';

export interface AcaoTransicaoWorkflowListAppState {
    acaoTransicaoWorkflowList: AcaoTransicaoWorkflowListState;
}

export const getAcaoTransicaoWorkflowListAppState = createFeatureSelector<AcaoTransicaoWorkflowListAppState>(
    'admin-acao-transicao-workflow-list-app'
);

export const getAppState: any = createSelector(
    getAcaoTransicaoWorkflowListAppState,
    (state: AcaoTransicaoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<AcaoTransicaoWorkflowListAppState> = {
    acaoTransicaoWorkflowList: AcaoTransicaoWorkflowListReducer
};

export * from './acao-transicao-workflow-list.reducer';
