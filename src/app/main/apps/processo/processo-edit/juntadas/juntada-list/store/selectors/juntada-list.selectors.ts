import {createSelector} from '@ngrx/store';
import {
    getJuntadaListAppState,
    JuntadaListAppState,
    JuntadaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr/juntada.schema';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaListState = createSelector(
    getJuntadaListAppState,
    (state: JuntadaListAppState) => state.juntadaList
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

export const getDesentranhandoIds = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.desentranhandoIds
);

export const getCopiandoIds = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.copiandoIds
);

export const getDesentranhandoJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDesentranhandoIds,
    schemaSelectors.entitiesProjector
);

export const getCopiandoJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCopiandoIds,
    schemaSelectors.entitiesProjector
);
