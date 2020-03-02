import {createSelector} from '@ngrx/store';
import {DocumentoAppState, getDocumentoAppState, RepositoriosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {repositorio as schemaRepositorio} from '@cdk/normalizr/repositorio.schema';
import {Repositorio} from '@cdk/models';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(schemaRepositorio);

export const getRepositoriosState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.repositorios
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
