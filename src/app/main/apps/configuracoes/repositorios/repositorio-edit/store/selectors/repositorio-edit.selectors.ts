import {createSelector} from '@ngrx/store';
import {getRepositorioEditAppState, RepositorioEditAppState, RepositorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr/repositorio.schema';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositorioEditState = createSelector(
    getRepositorioEditAppState,
    (state: RepositorioEditAppState) => state.repositorio
);

export const getRepositorioId = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded ? state.loaded.value : null
);

export const getRepositorio = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded
);

export const getErrors = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.errors
);
