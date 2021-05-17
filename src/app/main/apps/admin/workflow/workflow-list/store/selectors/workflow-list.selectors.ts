import {createSelector} from '@ngrx/store';
import {WorkflowListAppState, WorkflowListState, getWorkflowListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr/index';
import {Workflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Workflow>(workflowSchema);

export const getWorkflowListState = createSelector(
    getWorkflowListAppState,
    (state: WorkflowListAppState) => state.workflowList
);

export const getWorkflowListIds = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.entitiesId
);

export const getWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.pagination
);

export const getWorkflowListLoaded = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.deletedIds
);
