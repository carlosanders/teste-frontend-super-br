import {createSelector} from '@ngrx/store';
import {getUsuarioEditAppState, UsuarioEditAppState, UsuarioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuarioEditState = createSelector(
    getUsuarioEditAppState,
    (state: UsuarioEditAppState) => state.usuario
);

export const getUsuarioId = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.usuarioId
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.saving
);

export const getNextColaborador = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.nextColaborador
);

export const getHasLoaded = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.loaded
);

export const getErrors = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.errors
);
