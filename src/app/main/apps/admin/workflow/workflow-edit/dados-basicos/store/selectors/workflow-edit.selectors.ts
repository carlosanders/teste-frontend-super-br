import {createSelector} from '@ngrx/store';
import {getWorkflowDadosBasicosAppState, WorkflowDadosBasicosAppState, WorkflowDadosBasicosState} from '../reducers';

export const getWorkflowDadosBasicosState: any = createSelector(
    getWorkflowDadosBasicosAppState,
    (state: WorkflowDadosBasicosAppState) => state.workflow
);

export const getIsSaving: any = createSelector(
    getWorkflowDadosBasicosState,
    (state: WorkflowDadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getWorkflowDadosBasicosState,
    (state: WorkflowDadosBasicosState) => state.errors
);
