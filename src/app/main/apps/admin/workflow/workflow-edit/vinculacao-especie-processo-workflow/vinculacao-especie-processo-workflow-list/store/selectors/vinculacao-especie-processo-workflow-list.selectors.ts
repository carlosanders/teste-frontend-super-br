import {createSelector} from '@ngrx/store';
import {
    getVinculacaoEspecieProcessoWorkflowListAppState,
    VinculacaoEspecieProcessoWorkflowListAppState,
    VinculacaoEspecieProcessoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoEspecieProcessoWorkflow as vinculacaoEspecieProcessoWorkflowSchema} from '@cdk/normalizr';
import {VinculacaoEspecieProcessoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoEspecieProcessoWorkflow>(vinculacaoEspecieProcessoWorkflowSchema);

export const getVinculacaoEspecieProcessoWorkflowListState: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListAppState,
    (state: VinculacaoEspecieProcessoWorkflowListAppState) => state.vinculacaoEspecieProcessoWorkflowList
);

export const getVinculacaoEspecieProcessoWorkflowListIds: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.entitiesId
);

export const getVinculacaoEspecieProcessoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoEspecieProcessoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.pagination
);

export const getVinculacaoEspecieProcessoWorkflowListLoaded: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVinculacaoEspecieProcessoWorkflowListState,
    (state: VinculacaoEspecieProcessoWorkflowListState) => state.deletingErrors
);
