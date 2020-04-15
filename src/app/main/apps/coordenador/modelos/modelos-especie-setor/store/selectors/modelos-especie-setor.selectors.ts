import {createSelector} from '@ngrx/store';
import {getModelosEspecieSetorAppState, ModelosEspecieSetorAppState, ModelosEspecieSetorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModelosEspecieSetorState = createSelector(
    getModelosEspecieSetorAppState,
    (state: ModelosEspecieSetorAppState) => state.modelos
);

export const getModeloId = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getHasLoadedModelo = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => state.loaded.id === 'modeloHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => state.errors
);
