import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoVinculacaoTransicaoWorkflowListReducer, VinculacaoTransicaoWorkflowListState} from './vinculacao-transicao-workflow-list.reducer';

export interface VinculacaoTransicaoWorkflowListAppState {
    vinculacaoTransicaoWorkflowList: VinculacaoTransicaoWorkflowListState;
}

export const getVinculacaoTransicaoWorkflowListAppState = createFeatureSelector<VinculacaoTransicaoWorkflowListState>(
    'vinculacao-transicao-workflow-list'
);

export const getAppState: any = createSelector(
    getVinculacaoTransicaoWorkflowListAppState,
    (state: VinculacaoTransicaoWorkflowListState) => state
);

export const reducers: ActionReducerMap<VinculacaoTransicaoWorkflowListAppState> = {
    vinculacaoTransicaoWorkflowList: VinculacaoVinculacaoTransicaoWorkflowListReducer
};

export * from './vinculacao-transicao-workflow-list.reducer';
