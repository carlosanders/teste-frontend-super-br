import {createSelector} from '@ngrx/store';
import {getRegisterAppState, RegisterAppState, RegisterState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getRegisterState: any = createSelector(
    getRegisterAppState,
    (state: RegisterAppState) => state.register
);

export const getUsuarioId: any = createSelector(
    getRegisterState,
    (state: RegisterState) => state.usuarioId
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRegisterState,
    (state: RegisterState) => state.saving
);

export const getIsRegistred: any = createSelector(
    getRegisterState,
    (state: RegisterState) => state.isRegistred
);

export const getHasLoaded: any = createSelector(
    getRegisterState,
    (state: RegisterState) => state.loaded
);

export const getErrors: any = createSelector(
    getRegisterState,
    (state: RegisterState) => state.errors
);
