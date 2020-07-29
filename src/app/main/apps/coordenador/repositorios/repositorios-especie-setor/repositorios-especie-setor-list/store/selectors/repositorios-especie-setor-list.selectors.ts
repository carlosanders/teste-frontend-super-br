import {createSelector} from '@ngrx/store';
import {
    getRepositoriosEspecieSetorListAppState,
    RepositoriosEspecieSetorListAppState,
    RepositoriosEspecieSetorListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoRepositorio as vinculacaoRepositorioschema} from '@cdk/normalizr';
import {VinculacaoRepositorio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoRepositorio>(vinculacaoRepositorioschema);

export const getRepositoriosEspecieSetorListState = createSelector(
    getRepositoriosEspecieSetorListAppState,
    (state: RepositoriosEspecieSetorListAppState) => state.repositoriosEspecieSetorList
);

export const getRepositoriosEspecieSetorListIds = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.entitiesId
);

export const getRepositoriosEspecieSetorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositoriosEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.pagination
);

export const getRepositoriosEspecieSetorListLoaded = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.deletedIds
);
