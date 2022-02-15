import {createSelector} from '@ngrx/store';
import {getWorkflowEditAppState, WorkflowEditAppState, WorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr';
import {Workflow} from '@cdk/models';

const schemaWorkflowSelectors = createSchemaSelectors<Workflow>(workflowSchema);

export const getWorkflowEditState: any = createSelector(
    getWorkflowEditAppState,
    (state: WorkflowEditAppState) => state.workflow
);

export const getWorkflowId: any = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.entityId
);

export const getWorkflow: any = createSelector(
    schemaWorkflowSelectors.getNormalizedEntities,
    getWorkflowId,
    schemaWorkflowSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getWorkflowEditState,
    (state: WorkflowEditState) => state.loaded
);
