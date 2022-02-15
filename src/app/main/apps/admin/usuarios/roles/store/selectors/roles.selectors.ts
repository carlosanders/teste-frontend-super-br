import {createSelector} from '@ngrx/store';
import {RolesAppState, RolesState, getRolesAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRolesState: any = createSelector(
    getRolesAppState,
    (state: RolesAppState) => state.roles
);

export const getUsuarioId: any = createSelector(
    getRolesState,
    (state: RolesState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedUsuario: any = createSelector(
    getRolesState,
    (state: RolesState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getRolesState,
    (state: RolesState) => state.errors
);
