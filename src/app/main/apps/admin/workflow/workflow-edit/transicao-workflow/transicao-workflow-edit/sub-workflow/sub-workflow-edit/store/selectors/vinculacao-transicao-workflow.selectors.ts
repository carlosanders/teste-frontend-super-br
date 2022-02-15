import {createSelector} from '@ngrx/store';
import * as fromStore from '../index';

export const getVinculacaoTransicaoWorkflowState: any = createSelector(
    fromStore.getVinculacaoTransicaoWorkflowAppState,
    (state: fromStore.VinculacaoTransicaoWorkflowAppState) => state.vinculacaoTransicaoWorkflow
);

export const getIsSaving: any = createSelector(
    getVinculacaoTransicaoWorkflowState,
    (state: fromStore.VinculacaoTransicaoWorkflowState) => state.saving
);

export const getErrors: any = createSelector(
    getVinculacaoTransicaoWorkflowState,
    (state: fromStore.VinculacaoTransicaoWorkflowState) => state.errors
);
