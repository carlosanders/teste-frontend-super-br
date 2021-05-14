import {createSelector} from '@ngrx/store';
import {
    getEspecieProcessoListAppState,
    WorkflowEspecieProcessoListAppState,
    WorkflowEspecieProcessoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {EspecieProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieProcesso>(especieProcessoSchema);

export const getEspecieProcessoListState = createSelector(
    getEspecieProcessoListAppState,
    (state: WorkflowEspecieProcessoListAppState) => state.especieProcessoList
);

export const getEspecieProcessoListIds = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.entitiesId
);

export const getEspecieProcessoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.pagination
);

export const getEspecieProcessoListLoaded = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletingErrors
);
