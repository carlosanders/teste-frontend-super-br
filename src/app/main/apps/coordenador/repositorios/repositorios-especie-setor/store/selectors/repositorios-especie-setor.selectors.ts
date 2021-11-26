import {createSelector} from '@ngrx/store';
import {
    getRepositoriosEspecieSetorAppState,
    RepositoriosEspecieSetorAppState,
    RepositoriosEspecieSetorState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositoriosEspecieSetorState: any = createSelector(
    getRepositoriosEspecieSetorAppState,
    (state: RepositoriosEspecieSetorAppState) => state.repositorios
);

export const getRepositorioId: any = createSelector(
    getRepositoriosEspecieSetorState,
    (state: RepositoriosEspecieSetorState) => (state.loaded && state.loaded.id === 'repositorioHandle') ? state.loaded.value : null
);

export const getRepositorio: any = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
);

export const getHasLoadedRepositorio: any = createSelector(
    getRepositoriosEspecieSetorState,
    (state: RepositoriosEspecieSetorState) => state.loaded.id === 'repositorioHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getRepositoriosEspecieSetorState,
    (state: RepositoriosEspecieSetorState) => state.errors
);
