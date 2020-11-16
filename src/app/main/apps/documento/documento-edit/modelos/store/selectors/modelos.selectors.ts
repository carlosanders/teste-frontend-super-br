import {createSelector} from '@ngrx/store';
import {DocumentoEditModelosAppState, getDocumentoEditModelosAppState, ModelosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);

export const getModelosState = createSelector(
    getDocumentoEditModelosAppState,
    (state: DocumentoEditModelosAppState) => state.modelos
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

export const getModelosPagination = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosIsLoading = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);

export const getModelosLoaded = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);
