import {createSelector} from '@ngrx/store';
import {getModeloEditAppState, ModeloEditAppState, ModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModeloEditState = createSelector(
    getModeloEditAppState,
    (state: ModeloEditAppState) => state.modelo
);

export const getModeloId = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded
);

export const getErrors = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.errors
);
