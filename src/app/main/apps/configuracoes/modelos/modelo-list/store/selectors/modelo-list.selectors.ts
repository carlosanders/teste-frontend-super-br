import {createSelector} from '@ngrx/store';
import {
    getModeloListAppState,
    ModeloListAppState,
    ModeloListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {Modelo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModeloListState = createSelector(
    getModeloListAppState,
    (state: ModeloListAppState) => state.modeloList
);

export const getModeloListIds = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.entitiesId
);

export const getModeloList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModeloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.pagination
);

export const getModeloListLoaded = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.loaded
);

export const getIsLoading = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.loading
);

export const getDeletingIds = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.deletedIds
);
