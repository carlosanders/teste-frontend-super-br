import {createSelector} from '@ngrx/store';
import {getActivateAppState, ActivateAppState, ActivateState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getActivateState = createSelector(
    getActivateAppState,
    (state: ActivateAppState) => state.activate
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    schemaUsuarioSelectors.entityProjector
);

export const getIsActivated = createSelector(
    getActivateState,
    (state: ActivateState) => state.isActivated
);

export const getHasLoaded = createSelector(
    getActivateState,
    (state: ActivateState) => state.loaded
);

export const getErrors = createSelector(
    getActivateState,
    (state: ActivateState) => state.errors
);
