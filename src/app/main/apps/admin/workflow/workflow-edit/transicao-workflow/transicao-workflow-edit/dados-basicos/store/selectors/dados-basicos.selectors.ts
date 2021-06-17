import {createSelector} from '@ngrx/store';
import {
    getTransicaoWorkflowDadosBasicosAppState,
    TransicaoWorkflowDadosBasicosAppState,
    TransicaoWorkflowDadosBasicosState
} from '../reducers';

export const getTransicaoWorkflowDadosBasicosState = createSelector(
    getTransicaoWorkflowDadosBasicosAppState,
    (state: TransicaoWorkflowDadosBasicosAppState) => state.transicaoWorkflow
);

export const getIsSaving = createSelector(
    getTransicaoWorkflowDadosBasicosState,
    (state: TransicaoWorkflowDadosBasicosState) => state.saving
);

export const getErrors = createSelector(
    getTransicaoWorkflowDadosBasicosState,
    (state: TransicaoWorkflowDadosBasicosState) => state.errors
);
