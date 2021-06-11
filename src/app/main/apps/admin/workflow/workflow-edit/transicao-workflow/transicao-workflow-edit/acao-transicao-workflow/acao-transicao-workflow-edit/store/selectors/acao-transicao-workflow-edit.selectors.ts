import {createSelector} from '@ngrx/store';
import {AcaoTransicaoWorkflowEditAppState, AcaoTransicaoWorkflowEditState, getAcaoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';
import {acaoTransicaoWorkflow as acaoSchema} from '@cdk/normalizr';

const schemaAcaoSelectors = createSchemaSelectors<AcaoTransicaoWorkflow>(acaoSchema);

export const getAcaoEditState = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state.acaoTransicaoWorkflow
);

export const getAcaoId = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.loaded ? state.loaded.value : null
);

export const getAcao = createSelector(
    schemaAcaoSelectors.getNormalizedEntities,
    getAcaoId,
    schemaAcaoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.errors
);
