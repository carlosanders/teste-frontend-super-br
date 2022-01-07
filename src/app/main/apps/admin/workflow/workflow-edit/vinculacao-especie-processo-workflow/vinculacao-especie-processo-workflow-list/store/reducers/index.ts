import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    VinculacaoEspecieProcessoWorkflowListReducer, VinculacaoEspecieProcessoWorkflowListState,
} from './vinculacao-especie-processo-workflow-list.reducer';

export interface VinculacaoEspecieProcessoWorkflowListAppState {
    vinculacaoEspecieProcessoWorkflowList: VinculacaoEspecieProcessoWorkflowListState;
}

export const getVinculacaoEspecieProcessoWorkflowListAppState = createFeatureSelector<VinculacaoEspecieProcessoWorkflowListAppState>(
    'vinculacao-especie-processo-workflow-list-app'
);

export const getAppState: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListAppState,
    (state: VinculacaoEspecieProcessoWorkflowListAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoEspecieProcessoWorkflowListAppState> = {
    vinculacaoEspecieProcessoWorkflowList: VinculacaoEspecieProcessoWorkflowListReducer
};

export * from './vinculacao-especie-processo-workflow-list.reducer';
