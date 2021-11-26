import {createSelector} from '@ngrx/store';
import {getRepositoriosListAppState, RepositoriosListAppState, RepositoriosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models/repositorio.model';

const schemaSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositoriosListState: any = createSelector(
    getRepositoriosListAppState,
    (state: RepositoriosListAppState) => state.repositoriosList
);

export const getRepositoriosListIds: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.entitiesId
);

export const getRepositoriosList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRepositoriosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.pagination
);

export const getRepositoriosListLoaded: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRepositoriosListState,
    (state: RepositoriosListState) => state.deletingErrors
);
