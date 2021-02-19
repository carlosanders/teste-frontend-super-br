import {createSelector} from '@ngrx/store';
import {
    getTipoAcaoWorkflowListAppState,
    TipoAcaoWorkflowListAppState,
    TipoAcaoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowListState = createSelector(
    getTipoAcaoWorkflowListAppState,
    (state: TipoAcaoWorkflowListAppState) => state.tipoAcaoWorkflowList
);

export const getTipoAcaoWorkflowListIds = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.entitiesId
);

export const getTipoAcaoWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.pagination
);

export const getTipoAcaoWorkflowListLoaded = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.deletedIds
);
