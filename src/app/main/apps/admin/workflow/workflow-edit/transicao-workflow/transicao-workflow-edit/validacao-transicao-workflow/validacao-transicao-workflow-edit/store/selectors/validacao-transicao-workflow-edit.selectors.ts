import {createSelector} from '@ngrx/store';
import {
    getValidacaoEditAppState,
    ValidacaoTransicaoWorkflowEditAppState,
    ValidacaoTransicaoWorkflowEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {validacaoTransicaoWorkflow as validacaoSchema} from '@cdk/normalizr';

const schemaValidacaoSelectors = createSchemaSelectors<ValidacaoTransicaoWorkflow>(validacaoSchema);

export const getValidacaoEditState = createSelector(
    getValidacaoEditAppState,
    (state: ValidacaoTransicaoWorkflowEditAppState) => state.validacaoTransicaoWorkflow
);

export const getValidacaoId = createSelector(
    getValidacaoEditState,
    (state: ValidacaoTransicaoWorkflowEditState) => state.loaded ? state.loaded.value : null
);

export const getValidacao = createSelector(
    schemaValidacaoSelectors.getNormalizedEntities,
    getValidacaoId,
    schemaValidacaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getValidacaoEditState,
    (state: ValidacaoTransicaoWorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getValidacaoEditState,
    (state: ValidacaoTransicaoWorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getValidacaoEditState,
    (state: ValidacaoTransicaoWorkflowEditState) => state.errors
);
