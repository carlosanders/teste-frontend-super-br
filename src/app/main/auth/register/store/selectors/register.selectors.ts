import {createSelector} from '@ngrx/store';
import {getRegisterAppState, RegisterAppState, RegisterState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRegisterState = createSelector(
    getRegisterAppState,
    (state: RegisterAppState) => state.register
);

export const getUsuarioId = createSelector(
    getRegisterState,
    (state: RegisterState) => state.usuarioId
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRegisterState,
    (state: RegisterState) => state.saving
);

export const getIsRegistred = createSelector(
    getRegisterState,
    (state: RegisterState) => state.isRegistred
);

export const getHasLoaded = createSelector(
    getRegisterState,
    (state: RegisterState) => state.loaded
);

export const getErrors = createSelector(
    getRegisterState,
    (state: RegisterState) => state.errors
);
