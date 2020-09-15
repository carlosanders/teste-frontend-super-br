import {createSelector} from '@ngrx/store';
import {DocumentoEditAppState, getDocumentoEditAppState, RepositoriosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as schemaRepositorio} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(schemaRepositorio);

export const getRepositoriosState = createSelector(
    getDocumentoEditAppState,
    (state: DocumentoEditAppState) => state.repositorios
);

export const getRepositoriosIds = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.entitiesId
);

export const getRepositorios = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositoriosIds,
    schemaRepositorioSelectors.entitiesProjector
);

export const getRepositoriosPagination = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.pagination
);

export const getRepositoriosIsLoading = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.loading
);

export const getRepositoriosLoaded = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.loaded
);
