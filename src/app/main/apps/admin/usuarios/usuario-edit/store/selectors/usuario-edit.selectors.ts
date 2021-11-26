import {createSelector} from '@ngrx/store';
import {getUsuarioEditAppState, UsuarioEditAppState, UsuarioEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuarioEditState: any = createSelector(
    getUsuarioEditAppState,
    (state: UsuarioEditAppState) => state.usuario
);

export const getUsuarioId: any = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.usuarioId
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.saving
);

export const getNextColaborador: any = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.nextColaborador
);

export const getHasLoaded: any = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getUsuarioEditState,
    (state: UsuarioEditState) => state.errors
);
