import {createSelector} from '@ngrx/store';
import {getWorkflowListAppState, WorkflowListAppState, WorkflowListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr/index';
import {Workflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Workflow>(workflowSchema);

export const getWorkflowListState: any = createSelector(
    getWorkflowListAppState,
    (state: WorkflowListAppState) => state.workflowList
);

export const getWorkflowListIds: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.entitiesId
);

export const getWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.pagination
);

export const getWorkflowListLoaded: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getWorkflowListState,
    (state: WorkflowListState) => state.deletingErrors
);
