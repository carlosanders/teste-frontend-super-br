import {createSelector} from '@ngrx/store';
import {RolesAppState, RolesState, getRolesAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRolesState = createSelector(
    getRolesAppState,
    (state: RolesAppState) => state.roles
);

export const getUsuarioId = createSelector(
    getRolesState,
    (state: RolesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedUsuario = createSelector(
    getRolesState,
    (state: RolesState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getRolesState,
    (state: RolesState) => state.errors
);
