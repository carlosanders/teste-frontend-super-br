import {createSelector} from '@ngrx/store';
import {CoordenadoresAppState, CoordenadoresState, getCoordenadoresAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Usuario} from '@cdk/models';
import {usuario as usuarioSchema} from '@cdk/normalizr';

const schemaUsuarioSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getCoordenadoresState = createSelector(
    getCoordenadoresAppState,
    (state: CoordenadoresAppState) => state.coordenadores
);

export const getUsuarioId = createSelector(
    getCoordenadoresState,
    (state: CoordenadoresState) => (state.loaded && state.loaded.id === 'usuarioHandle') ? state.loaded.value : null
);

export const getUsuario = createSelector(
    schemaUsuarioSelectors.getNormalizedEntities,
    getUsuarioId,
    schemaUsuarioSelectors.entityProjector
);

export const getHasLoadedUsuario = createSelector(
    getCoordenadoresState,
    (state: CoordenadoresState) => state.loaded.id === 'usuarioHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getCoordenadoresState,
    (state: CoordenadoresState) => state.errors
);
