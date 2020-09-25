import {createSelector} from '@ngrx/store';
import {getTransicaoWorkflowListAppState, TransicaoWorkflowListAppState, TransicaoWorkflowListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '../../../../../../../../../@cdk/normalizr';
import {TransicaoWorkflow} from '../../../../../../../../../@cdk/models';

const schemaSelectors = createSchemaSelectors<TransicaoWorkflow>(transicaoWorkflowSchema);

export const getTransicaoWorkflowListState = createSelector(
    getTransicaoWorkflowListAppState,
    (state: TransicaoWorkflowListAppState) => state.transicaoWorkflowList
);

export const getWorkflowListIds = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.entitiesId
);

export const getTransicaoWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.pagination
);

export const getWorkflowListLoaded = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTransicaoWorkflowListState,
    (state: TransicaoWorkflowListState) => state.deletedIds
);
