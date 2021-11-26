import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkflowDadosBasicosReducer, WorkflowDadosBasicosState} from './workflow-dados-basicos.reducer';

export interface WorkflowDadosBasicosAppState {
    workflow: WorkflowDadosBasicosState;
}

export const getWorkflowDadosBasicosAppState = createFeatureSelector<WorkflowDadosBasicosAppState>(
    'workflow-dados-basicos-app'
);

export const getAppState: any = createSelector(
    getWorkflowDadosBasicosAppState,
    (state: WorkflowDadosBasicosAppState) => state
);

export const reducers: ActionReducerMap<WorkflowDadosBasicosAppState> = {
    workflow: WorkflowDadosBasicosReducer
};

export * from './workflow-dados-basicos.reducer';
