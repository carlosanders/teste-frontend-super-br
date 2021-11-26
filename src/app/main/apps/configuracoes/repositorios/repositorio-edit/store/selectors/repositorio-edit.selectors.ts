import {createSelector} from '@ngrx/store';
import {getRepositorioEditAppState, RepositorioEditAppState, RepositorioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';

const schemaRepositorioSelectors = createSchemaSelectors<Repositorio>(repositorioSchema);

export const getRepositorioEditState: any = createSelector(
    getRepositorioEditAppState,
    (state: RepositorioEditAppState) => state.repositorio
);

export const getRepositorioId: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded ? state.loaded.value : null
);

export const getRepositorio: any = createSelector(
    schemaRepositorioSelectors.getNormalizedEntities,
    getRepositorioId,
    schemaRepositorioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRepositorioEditState,
    (state: RepositorioEditState) => state.errors
);
