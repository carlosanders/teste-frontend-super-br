import {createSelector} from '@ngrx/store';
import {getModeloEditAppState, ModeloEditAppState, ModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getModeloEditState: any = createSelector(
    getModeloEditAppState,
    (state: ModeloEditAppState) => state.modelo
);

export const getModeloId: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getModelo: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getModeloEditState,
    (state: ModeloEditState) => state.errors
);
