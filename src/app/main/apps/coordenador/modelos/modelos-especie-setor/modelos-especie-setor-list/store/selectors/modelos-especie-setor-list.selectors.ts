import {createSelector} from '@ngrx/store';
import {
    getModelosEspecieSetorListAppState,
    ModelosEspecieSetorListAppState,
    ModelosEspecieSetorListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoModelo as vinculacaoModeloSchema} from '@cdk/normalizr';
import {VinculacaoModelo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoModelo>(vinculacaoModeloSchema);

export const getModelosEspecieSetorListState = createSelector(
    getModelosEspecieSetorListAppState,
    (state: ModelosEspecieSetorListAppState) => state.modelosEspecieSetorList
);

export const getModelosEspecieSetorListIds = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.entitiesId
);

export const getModelosEspecieSetorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModelosEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.pagination
);

export const getModelosEspecieSetorListLoaded = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletingErrors
);
