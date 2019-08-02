import {createSelector} from '@ngrx/store';
import {
    getModelosAppState,
    ModelosAppState,
    ModelosState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo} from '@cdk/normalizr/modelo.schema';
import {Modelo} from '@cdk/models/modelo.model';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);

export const getModelosState = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.modelos
);

export const getModelosIds = createSelector(
    getModelosState,
    (state: ModelosState) => state.entitiesId
);

export const getModelos = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModelosIds,
    schemaModeloSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosLoaded = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);

export const getIsLoading = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);

