import {createSelector} from '@ngrx/store';
import {getModeloListAppState, ModeloListAppState, ModeloListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModeloListState: any = createSelector(
    getModeloListAppState,
    (state: ModeloListAppState) => state.modeloList
);

export const getModeloListIds: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.entitiesId
);

export const getModeloList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModeloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.pagination
);

export const getModeloListLoaded: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getModeloListState,
    (state: ModeloListState) => state.deletingErrors
);
