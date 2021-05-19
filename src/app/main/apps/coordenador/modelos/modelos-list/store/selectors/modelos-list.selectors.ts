import {createSelector} from '@ngrx/store';
import {
    getModelosListAppState,
    ModelosListAppState,
    ModelosListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models/modelo.model';

const schemaSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModelosListState = createSelector(
    getModelosListAppState,
    (state: ModelosListAppState) => state.modelosList
);

export const getModelosListIds = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.entitiesId
);

export const getModelosList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModelosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.pagination
);

export const getModelosListLoaded = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.loaded
);

export const getIsLoading = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.loading
);

export const getDeletingIds = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletingErrors
);
