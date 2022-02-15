import {createSelector} from '@ngrx/store';
import {
    getTransicaoWorkflowDadosBasicosAppState,
    TransicaoWorkflowDadosBasicosAppState,
    TransicaoWorkflowDadosBasicosState
} from '../reducers';

export const getTransicaoWorkflowDadosBasicosState: any = createSelector(
    getTransicaoWorkflowDadosBasicosAppState,
    (state: TransicaoWorkflowDadosBasicosAppState) => state.transicaoWorkflow
);

export const getIsSaving: any = createSelector(
    getTransicaoWorkflowDadosBasicosState,
    (state: TransicaoWorkflowDadosBasicosState) => state.saving
);

export const getErrors: any = createSelector(
    getTransicaoWorkflowDadosBasicosState,
    (state: TransicaoWorkflowDadosBasicosState) => state.errors
);
