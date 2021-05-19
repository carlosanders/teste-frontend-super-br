import {createSelector} from '@ngrx/store';
import {
    getTipoValidacaoWorkflowListAppState,
    TipoValidacaoWorkflowListAppState,
    TipoValidacaoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(tipoValidacaoWorkflowSchema);

export const getTipoValidacaoWorkflowListState = createSelector(
    getTipoValidacaoWorkflowListAppState,
    (state: TipoValidacaoWorkflowListAppState) => state.tipoValidacaoWorkflowList
);

export const getTipoValidacaoWorkflowListIds = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.entitiesId
);

export const getTipoValidacaoWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.pagination
);

export const getTipoValidacaoWorkflowListLoaded = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletingErrors
);
