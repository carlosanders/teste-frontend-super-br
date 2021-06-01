import {createSelector} from '@ngrx/store';
import {getWorkflowEspeciesEditAppState, WorkflowEspeciesProcessoEditAppState, WorkflowEspeciesProcessoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {Workflow} from '@cdk/models';

const schemaTransicaoWorkflowSelectors = createSchemaSelectors<Workflow>(transicaoWorkflowSchema);

export const getWorkflowEspeciesProcessoEditState = createSelector(
    getWorkflowEspeciesEditAppState,
    (state: WorkflowEspeciesProcessoEditAppState) => state.especieProcesso
);

export const getEspecieProcessoId = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.entityId
);

export const getEspecieProcesso = createSelector(
    schemaTransicaoWorkflowSelectors.getNormalizedEntities,
    getEspecieProcessoId,
    schemaTransicaoWorkflowSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.loaded
);

export const getErrors = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.errors
);
