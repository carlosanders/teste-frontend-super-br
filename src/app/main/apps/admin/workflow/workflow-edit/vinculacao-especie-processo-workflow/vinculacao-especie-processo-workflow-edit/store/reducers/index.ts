import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoEspecieProcessoWorkflowEditReducer, VinculacaoEspecieProcessoWorkflowEditState} from './vinculacao-especie-processo-workflow-edit.reducer';

export interface VinculacaoEspecieProcessoWorkflowEditAppState {
    vinculacaoEspecieProcessoWorkflow: VinculacaoEspecieProcessoWorkflowEditState;
}

export const getVinculacaoEspecieProcessoWorkflowEditAppState = createFeatureSelector<VinculacaoEspecieProcessoWorkflowEditAppState>(
    'vinculacao-especie-processo-workflow-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditAppState,
    (state: VinculacaoEspecieProcessoWorkflowEditAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoEspecieProcessoWorkflowEditAppState> = {
    vinculacaoEspecieProcessoWorkflow: VinculacaoEspecieProcessoWorkflowEditReducer
};

export * from './vinculacao-especie-processo-workflow-edit.reducer';
