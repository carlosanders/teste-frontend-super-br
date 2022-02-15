import {createSelector} from '@ngrx/store';
import {getTransicaoWorkflowListAppState, TransicaoWorkflowListAppState, TransicaoWorkflowListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {TransicaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TransicaoWorkflow>(transicaoWorkflowSchema);

export const getTransicaoWorkflowListState: any = createSelector(
    getTransicaoWorkflowListAppState,
    (state: TransicaoWorkflowListAppState) => state.transicaoWorkflowList
);

export const getWorkflowListIds: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.entitiesId
);

export const getTransicaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.pagination
);

export const getWorkflowListLoaded: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.deletingErrors
);
