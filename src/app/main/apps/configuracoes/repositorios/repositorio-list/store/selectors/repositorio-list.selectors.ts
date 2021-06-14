import {createSelector} from '@ngrx/store';
import {getRepositorioListAppState, RepositorioListAppState, RepositorioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositorioListState = createSelector(
    getRepositorioListAppState,
    (state: RepositorioListAppState) => state.repositorioList
);

export const getRepositorioListIds = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.entitiesId
);

export const getRepositorioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositorioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.pagination
);

export const getRepositorioListLoaded = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletingErrors
);
