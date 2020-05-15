import {createSelector} from '@ngrx/store';
import {getActivateAppState, ActivateAppState, ActivateState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getActivateState = createSelector(
    getActivateAppState,
    (state: ActivateAppState) => state.activate
);

export const getUsuarioId = createSelector(
    getActivateState,
    (state: ActivateState) => state.usuarioId
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getIsActivated = createSelector(
    getActivateState,
    (state: ActivateState) => state.isActived
);

export const getHasLoaded = createSelector(
    getActivateState,
    (state: ActivateState) => state.loaded
);

export const getErrors = createSelector(
    getActivateState,
    (state: ActivateState) => state.errors
);
