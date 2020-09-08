import {createSelector} from '@ngrx/store';
import {getWorkflowEditAppState, WorkflowEditAppState, WorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr/index';
import {Workflow} from '../../../../../../../../@cdk/models';

const schemaWorkflowSelectors = createSchemaSelectors<Workflow>(workflowSchema);

export const getWorkflowEditState = createSelector(
    getWorkflowEditAppState,
    (state: WorkflowEditAppState) => state.workflow
);

export const getWorkflowId = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.entityId
);

export const getWorkflow = createSelector(
    schemaWorkflowSelectors.getNormalizedEntities,
    getWorkflowId,
    schemaWorkflowSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.errors
);
