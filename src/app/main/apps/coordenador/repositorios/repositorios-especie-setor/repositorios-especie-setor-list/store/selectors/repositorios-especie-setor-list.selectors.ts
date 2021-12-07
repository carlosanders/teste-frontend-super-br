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

export const getRepositoriosEspecieSetorListState: any = createSelector(
    getRepositoriosEspecieSetorListAppState,
    (state: RepositoriosEspecieSetorListAppState) => state.repositoriosEspecieSetorList
);

export const getRepositoriosEspecieSetorListIds: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.entitiesId
);

export const getRepositoriosEspecieSetorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositoriosEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.pagination
);

export const getRepositoriosEspecieSetorListLoaded: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRepositoriosEspecieSetorListState,
    (state: RepositoriosEspecieSetorListState) => state.deletingErrors
);
