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


export const getJuntadaListState: any = createSelector(
    getDesentranhamentoCreateBlocoAppState,
    (state: DesentranhamentoCreateBlocoAppState) => state.juntadaCreateBloco
);

export const getJuntadaListIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.entitiesId
);

export const getDesentranhandoIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.desentranhandoIds
);

export const getJuntadaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.pagination
);

export const getJuntadaListLoaded: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.loading
);

export const getDesentranhandoJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDesentranhandoIds,
    schemaSelectors.entitiesProjector
);

export const getErrors: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.errors
);

export const getBufferingDesentranhamento: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.bufferingDesentranhando
);

export const getSavingIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.savingJuntadasId
);

export const getSelectedJuntadasIds: any = createSelector(
    getJuntadaListState,
    (state: JuntadaCreateBlocoState) => state.selectedJuntadasIds
);

export const getSelectedJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedJuntadasIds,
    schemaSelectors.entitiesProjector
);
