import {createSelector} from '@ngrx/store';
import {getModeloAnexoAppState, ModeloAnexoAppState, ModeloAnexoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models/modelo.model';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModeloAnexoState = createSelector(
    getModeloAnexoAppState,
    (state: ModeloAnexoAppState) => state.modelo
);

export const getModeloId = createSelector(
    getModeloAnexoState,
    (state: ModeloAnexoState) => state.loaded ? state.loaded.value : null
);

export const getModelo = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getModeloAnexoState,
    (state: ModeloAnexoState) => state.saving
);

export const getHasLoaded = createSelector(
    getModeloAnexoState,
    (state: ModeloAnexoState) => state.loaded
);

export const getErrors = createSelector(
    getModeloAnexoState,
    (state: ModeloAnexoState) => state.errors
);
