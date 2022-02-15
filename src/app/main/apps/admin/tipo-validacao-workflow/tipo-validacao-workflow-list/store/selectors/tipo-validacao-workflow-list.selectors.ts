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

export const getTipoValidacaoWorkflowListState: any = createSelector(
    getTipoValidacaoWorkflowListAppState,
    (state: TipoValidacaoWorkflowListAppState) => state.tipoValidacaoWorkflowList
);

export const getTipoValidacaoWorkflowListIds: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.entitiesId
);

export const getTipoValidacaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.pagination
);

export const getTipoValidacaoWorkflowListLoaded: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowListState) => state.deletingErrors
);
