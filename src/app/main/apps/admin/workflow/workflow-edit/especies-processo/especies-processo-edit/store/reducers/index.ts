import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkflowEspeciesProcessoEditReducer} from './especies-processo-edit.reducer';
import {WorkflowEspeciesProcessoEditState} from './index';

export interface WorkflowEspeciesProcessoEditAppState {
    especieProcesso: WorkflowEspeciesProcessoEditState;
}

export const getWorkflowEspeciesEditAppState = createFeatureSelector<WorkflowEspeciesProcessoEditAppState>(
    'workflow-edit-especies-processo-edit-app'
);

export const getAppState = createSelector(
    getWorkflowEspeciesEditAppState,
    (state: WorkflowEspeciesProcessoEditAppState) => state
);

export const reducers: ActionReducerMap<WorkflowEspeciesProcessoEditAppState> = {
    especieProcesso: WorkflowEspeciesProcessoEditReducer
};

export * from './especies-processo-edit.reducer';
