import {createSelector} from '@ngrx/store';
import {getDadosBasicosAppState, DadosBasicosAppState, JuntadaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaListState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.juntadas
);

export const getJuntadaListIds = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.entitiesId
);

export const getJuntadaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.pagination
);

export const getJuntadaListLoaded = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.loading
);
