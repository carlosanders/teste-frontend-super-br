import {createSelector} from '@ngrx/store';
import {AfastamentosAppState, AfastamentosState, getAfastamentosAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getAfastamentosState: any = createSelector(
    getAfastamentosAppState,
    (state: AfastamentosAppState) => state.afastamentos
);

export const getUsuarioId: any = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario: any = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedUsuario: any = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getAfastamentosState,
    (state: AfastamentosState) => state.errors
);
