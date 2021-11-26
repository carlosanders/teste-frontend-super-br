import {createSelector} from '@ngrx/store';
import {
    getWorkflowEspeciesEditAppState,
    WorkflowEspeciesProcessoEditAppState,
    WorkflowEspeciesProcessoEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {Workflow} from '@cdk/models';

const schemaTransicaoWorkflowSelectors = createSchemaSelectors<Workflow>(transicaoWorkflowSchema);

export const getWorkflowEspeciesProcessoEditState: any = createSelector(
    getWorkflowEspeciesEditAppState,
    (state: WorkflowEspeciesProcessoEditAppState) => state.especieProcesso
);

export const getEspecieProcessoId: any = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.entityId
);

export const getEspecieProcesso: any = createSelector(
    schemaTransicaoWorkflowSelectors.getNormalizedEntities,
    getEspecieProcessoId,
    schemaTransicaoWorkflowSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getWorkflowEspeciesProcessoEditState,
    (state: WorkflowEspeciesProcessoEditState) => state.errors
);
