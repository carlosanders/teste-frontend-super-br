import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, JuntadaState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.juntadas
);

export const getJuntadaIds: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.entitiesId
);

export const getJuntada: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaIds,
    schemaSelectors.entitiesProjector
);

export const getJuntadaPagination: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getJuntadaLoaded: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getJuntadaIsLoading: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loading
);

export const getAssinandoDocumentosId: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.assinandoDocumentoIds
);

export const getPagination: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getDesentranhandoIds: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.desentranhandoIds
);

export const getDesentranhadoIds: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.desentranhadoIds
);
