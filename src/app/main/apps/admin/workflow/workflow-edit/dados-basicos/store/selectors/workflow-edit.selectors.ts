import {createSelector} from '@ngrx/store';
import {getWorkflowDadosBasicosAppState, WorkflowDadosBasicosAppState, WorkflowDadosBasicosState} from '../reducers';

export const getWorkflowDadosBasicosState = createSelector(
    getWorkflowDadosBasicosAppState,
    (state: WorkflowDadosBasicosAppState) => state.workflow
);

export const getIsSaving = createSelector(
    getWorkflowDadosBasicosState,
    (state: WorkflowDadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getWorkflowDadosBasicosState,
    (state: WorkflowDadosBasicosState) => state.errors
);
