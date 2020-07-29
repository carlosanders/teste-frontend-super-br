import {createSelector} from '@ngrx/store';
import {getAfastamentosAppState, AfastamentosAppState, AfastamentosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getAfastamentosState = createSelector(
    getAfastamentosAppState,
    (state: AfastamentosAppState) => state.afastamentos
);

export const getUsuarioId = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedUsuario = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => state.errors
);
