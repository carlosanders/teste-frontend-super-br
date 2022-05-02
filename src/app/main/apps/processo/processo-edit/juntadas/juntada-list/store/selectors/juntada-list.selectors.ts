import {createSelector} from '@ngrx/store';
import {getJuntadaListAppState, JuntadaListAppState, JuntadaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaListState: any = createSelector(
    getJuntadaListAppState,
    (state: JuntadaListAppState) => state.juntadaList
);

export const getJuntadaListIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.entitiesId
);

export const getJuntadaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.pagination
);

export const getJuntadaListLoaded: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.loading
);

export const getDesentranhandoIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.desentranhandoIds
);

export const getDesentranhadoIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.desentranhadoIds
);

export const getCopiandoIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaListState) => state.copiandoIds
);

export const getDesentranhandoJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDesentranhandoIds,
    schemaSelectors.entitiesProjector
);

export const getCopiandoJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCopiandoIds,
    schemaSelectors.entitiesProjector
);
