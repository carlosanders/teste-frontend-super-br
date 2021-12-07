import {createSelector} from '@ngrx/store';
import {DocumentoAvulsoEditModelosAppState, getDocumentoAvulsoEditModelosAppState, ModelosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);

export const getModelosState: any = createSelector(
    getDocumentoAvulsoEditModelosAppState,
    (state: DocumentoAvulsoEditModelosAppState) => state.modelos
);

export const getModelosIds: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.entitiesId
);

export const getModelos: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModelosIds,
    schemaModeloSelectors.entitiesProjector
);

export const getModelosPagination: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosIsLoading: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);

export const getModelosLoaded: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);
