import {createSelector} from '@ngrx/store';
import {getModelosListAppState, ModelosListAppState, ModelosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models/modelo.model';

const schemaSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModelosListState: any = createSelector(
    getModelosListAppState,
    (state: ModelosListAppState) => state.modelosList
);

export const getModelosListIds: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.entitiesId
);

export const getModelosList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModelosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.pagination
);

export const getModelosListLoaded: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getModelosListState,
    (state: ModelosListState) => state.deletingErrors
);
