import {createSelector} from '@ngrx/store';
import {getTipoAcaoWorkflowListAppState, TipoAcaoWorkflowListAppState, TipoAcaoWorkflowListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowListState: any = createSelector(
    getTipoAcaoWorkflowListAppState,
    (state: TipoAcaoWorkflowListAppState) => state.tipoAcaoWorkflowList
);

export const getTipoAcaoWorkflowListIds: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.entitiesId
);

export const getTipoAcaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.pagination
);

export const getTipoAcaoWorkflowListLoaded: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowListState) => state.deletingErrors
);
