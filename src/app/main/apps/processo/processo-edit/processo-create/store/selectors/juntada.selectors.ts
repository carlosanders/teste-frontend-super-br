import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState, JuntadaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.juntadas
);

export const getJuntadaIds = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.entitiesId
);

export const getJuntada = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaIds,
    schemaSelectors.entitiesProjector
);

export const getJuntadaPagination = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getJuntadaLoaded = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getJuntadaIsLoading = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loading
);
