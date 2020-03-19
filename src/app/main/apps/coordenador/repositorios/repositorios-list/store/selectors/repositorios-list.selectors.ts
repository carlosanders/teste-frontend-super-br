import {createSelector} from '@ngrx/store';
import {
    getRepositoriosListAppState,
    RepositoriosListAppState,
    RepositoriosListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';
import {Repositorio} from '@cdk/models/repositorio.model';

const schemaSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositoriosListState = createSelector(
    getRepositoriosListAppState,
    (state: RepositoriosListAppState) => state.repositoriosList
);

export const getRepositoriosListIds = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.entitiesId
);

export const getRepositoriosList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositoriosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.pagination
);

export const getRepositoriosListLoaded = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.deletedIds
);
