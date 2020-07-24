import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState, InteressadoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr/interessado.schema';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.interessados
);

export const getInteressadosIds = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.entitiesId
);

export const getInteressados = createSelector(
    schemaSelectors.getNormalizedEntities,
    getInteressadosIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationInteressados = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.pagination
);

export const getInteressadosLoaded = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loaded
);

export const getIsInteressadosLoading = createSelector(
    getInteressadoState,
    (state: InteressadoState) => state.loading
);
