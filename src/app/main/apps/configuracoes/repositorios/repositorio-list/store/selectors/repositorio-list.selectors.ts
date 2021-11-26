import {createSelector} from '@ngrx/store';
import {getRepositorioListAppState, RepositorioListAppState, RepositorioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositorioListState: any = createSelector(
    getRepositorioListAppState,
    (state: RepositorioListAppState) => state.repositorioList
);

export const getRepositorioListIds: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.entitiesId
);

export const getRepositorioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositorioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.pagination
);

export const getRepositorioListLoaded: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRepositorioListState,
    (state: RepositorioListState) => state.deletingErrors
);
