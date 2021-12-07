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

export const getModelosEspecieSetorListState: any = createSelector(
    getModelosEspecieSetorListAppState,
    (state: ModelosEspecieSetorListAppState) => state.modelosEspecieSetorList
);

export const getModelosEspecieSetorListIds: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.entitiesId
);

export const getModelosEspecieSetorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModelosEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.pagination
);

export const getModelosEspecieSetorListLoaded: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getModelosEspecieSetorListState,
    (state: ModelosEspecieSetorListState) => state.deletingErrors
);
