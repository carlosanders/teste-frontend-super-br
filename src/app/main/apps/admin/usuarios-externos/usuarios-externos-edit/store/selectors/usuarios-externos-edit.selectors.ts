import {createSelector} from '@ngrx/store';
import {getUsuariosExternosEditAppState, UsuariosExternosEditAppState, UsuariosExternosEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosExternosEditState: any = createSelector(
    getUsuariosExternosEditAppState,
    (state: UsuariosExternosEditAppState) => state.usuariosExternos
);

export const getUsuariosExternosId: any = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.entityId
);

export const getUsuariosExternos: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuariosExternosId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getUsuariosExternosEditState,
    (state: UsuariosExternosEditState) => state.errors
);
