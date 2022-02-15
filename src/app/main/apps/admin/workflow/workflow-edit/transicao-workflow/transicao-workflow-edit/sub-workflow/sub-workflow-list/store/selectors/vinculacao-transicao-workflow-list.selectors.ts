import {createSelector} from '@ngrx/store';
import {
    getAppState,
    VinculacaoTransicaoWorkflowListAppState,
    VinculacaoTransicaoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoTransicaoWorkflow as vinculacaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import {VinculacaoTransicaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoTransicaoWorkflow>(vinculacaoTransicaoWorkflowSchema);

export const getVinculacaoTransicaoWorkflowListState: any = createSelector(
    getAppState,
    (state: VinculacaoTransicaoWorkflowListAppState) => state.vinculacaoTransicaoWorkflowList
);

export const getVinculacaoWorkflowListIds: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.entitiesId
);

export const getVinculacaoTransicaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.pagination
);

export const getIsLoaded: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVinculacaoTransicaoWorkflowListState,
    (state: VinculacaoTransicaoWorkflowListState) => state.deletingErrors
);
