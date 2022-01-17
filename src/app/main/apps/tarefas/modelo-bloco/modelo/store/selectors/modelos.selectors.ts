import {createSelector} from '@ngrx/store';
import {getModelosAppState, ModelosBlocoAppState, ModelosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);

export const getModelosState: any = createSelector(
    getModelosAppState,
    (state: ModelosBlocoAppState) => state.modelos
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

export const getPagination: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosLoaded: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);
