import {createSelector} from '@ngrx/store';
import {
    getVinculacaoEspecieProcessoWorkflowEditAppState,
    VinculacaoEspecieProcessoWorkflowEditAppState,
    VinculacaoEspecieProcessoWorkflowEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoEspecieProcessoWorkflow as vinculacaoEspecieProcessoWorkflowSchema, workflow as workflowSchema} from '@cdk/normalizr';
import {VinculacaoEspecieProcessoWorkflow, Workflow} from '@cdk/models';

const schemaVinculacaoEspecieProcessoWorkflowSelectors = createSchemaSelectors<VinculacaoEspecieProcessoWorkflow>(vinculacaoEspecieProcessoWorkflowSchema);
const schemaWorkflowSelectors = createSchemaSelectors<Workflow>(workflowSchema);

export const getVinculacaoEspecieProcessoWorkflowEditState: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditAppState,
    (state: VinculacaoEspecieProcessoWorkflowEditAppState) => state.vinculacaoEspecieProcessoWorkflow
);

export const getVinculacaoEspecieProcessoWorkflowId: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditState,
    (state: VinculacaoEspecieProcessoWorkflowEditState) => state.entityId
);

export const getVinculacaoEspecieProcessoWorkflow: any = createSelector(
    schemaVinculacaoEspecieProcessoWorkflowSelectors.getNormalizedEntities,
    getVinculacaoEspecieProcessoWorkflowId,
    schemaVinculacaoEspecieProcessoWorkflowSelectors.entityProjector
);

export const getWorkflow: any = (workfloId: number):any => createSelector(
    schemaWorkflowSelectors.getNormalizedEntities,
    () => workfloId,
    schemaWorkflowSelectors.entityProjector,
);

export const getIsSaving: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditState,
    (state: VinculacaoEspecieProcessoWorkflowEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditState,
    (state: VinculacaoEspecieProcessoWorkflowEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowEditState,
    (state: VinculacaoEspecieProcessoWorkflowEditState) => state.errors
);
