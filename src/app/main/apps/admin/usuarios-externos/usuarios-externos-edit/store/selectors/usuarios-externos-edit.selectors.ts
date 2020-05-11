import {createSelector} from '@ngrx/store';
import {getUsuariosExternosEditAppState, UsuariosExternosEditAppState, UsuariosExternosEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosExternosEditState = createSelector(
    getUsuariosExternosEditAppState,
    (state: UsuariosExternosEditAppState) => state.usuariosExternos
);

export const getUsuariosExternosId = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.entityId
);

export const getUsuariosExternos = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuariosExternosId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.loaded
);

export const getErrors = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.errors
);
