import {createSelector} from '@ngrx/store';
import {getModelosEspecieSetorAppState, ModelosEspecieSetorAppState, ModelosEspecieSetorState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModelosEspecieSetorState: any = createSelector(
    getModelosEspecieSetorAppState,
    (state: ModelosEspecieSetorAppState) => state.modelos
);

export const getModeloId: any = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => (state.loaded && state.loaded.id === 'modeloHandle') ? state.loaded.value : null
);

export const getModelo: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getHasLoadedModelo: any = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => state.loaded.id === 'modeloHandle' ? state.loaded : false
);

export const getErrors: any = createSelector(
    getModelosEspecieSetorState,
    (state: ModelosEspecieSetorState) => state.errors
);
