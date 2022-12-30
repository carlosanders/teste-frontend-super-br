import {createSelector} from '@ngrx/store';
import {ActivateAppState, ActivateState, getActivateAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getActivateState: any = createSelector(
    getActivateAppState,
    (state: ActivateAppState) => state.activate
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    schemaUsuarioSelectors.entityProjector
);

export const getIsActivated: any = createSelector(
    getActivateState,
    (state: ActivateState) => state.isActivated
);

export const getHasLoaded: any = createSelector(
    getActivateState,
    (state: ActivateState) => state.loaded
);

export const getErrors: any = createSelector(
    getActivateState,
    (state: ActivateState) => state.errors
);
export const getIsLoading: any = createSelector(
    getActivateState,
    (state: ActivateState) => state.loading
);

