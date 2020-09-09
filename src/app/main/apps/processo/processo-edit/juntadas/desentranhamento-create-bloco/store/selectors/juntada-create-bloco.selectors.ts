import {createSelector} from '@ngrx/store';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';
import {
    DesentranhamentoCreateBlocoAppState,
    getDesentranhamentoCreateBlocoAppState,
    JuntadaCreateBlocoState
} from '../reducers';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);


export const getJuntadaListState = createSelector(
    getDesentranhamentoCreateBlocoAppState,
    (state: DesentranhamentoCreateBlocoAppState) => state.juntadaCreateBloco
);

export const getJuntadaListIds = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.entitiesId
);

export const getDesentranhandoIds = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.desentranhandoIds
);

export const getJuntadaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.pagination
);

export const getJuntadaListLoaded = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.loaded
);

export const getIsLoading = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.loading
);

export const getDesentranhandoJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDesentranhandoIds,
    schemaSelectors.entitiesProjector
);
