import {createSelector} from '@ngrx/store';
import {DocumentoEditInteligenciaAppState, getDocumentoEditInteligenciaAppState, RepositoriosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as schemaRepositorio} from '@cdk/normalizr';
import {Repositorio} from '@cdk/models';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(schemaRepositorio);

export const getRepositoriosState: any = createSelector(
    getDocumentoEditInteligenciaAppState,
    (state: DocumentoEditInteligenciaAppState) => state.repositorios
);

export const getRepositoriosIds: any = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.entitiesId
);

export const getRepositorios: any = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositoriosIds,
    schemaRepositorioSelectors.entitiesProjector
);

export const getRepositoriosPagination: any = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.pagination
);

export const getRepositoriosIsLoading: any = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.loading
);

export const getRepositoriosLoaded: any = createSelector(
    getRepositoriosState,
    (state: RepositoriosState) => state.loaded
);
