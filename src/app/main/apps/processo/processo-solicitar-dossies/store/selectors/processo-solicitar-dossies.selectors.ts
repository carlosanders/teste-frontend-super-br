import {createSelector} from '@ngrx/store';
import {getProcessoSolicitarDossiesAppState, ProcessoSolicitarDossiesAppState, ProcessoSolicitarDossiesState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema, tipoDossie as tipoDossieSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);
const schemaSelectors2 = createSchemaSelectors<Interessado>(tipoDossieSchema);

export const getInteressadoListState: any = createSelector(
    getProcessoSolicitarDossiesAppState,
    (state: ProcessoSolicitarDossiesAppState) => state.interessadoList
);

export const getInteressadoListIds: any = createSelector(
    getInteressadoListState,
    (state: ProcessoSolicitarDossiesState) => state.entitiesId
);

export const getInteressadoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getInteressadoListIds,
    schemaSelectors.entitiesProjector
);

export const getTiposDossieListState: any = createSelector(
    getProcessoSolicitarDossiesAppState,
    (state: ProcessoSolicitarDossiesAppState) => state.tiposDossieList
);

export const getTiposDossieListIds: any = createSelector(
    getTiposDossieListState,
    (state: ProcessoSolicitarDossiesState) => state.entitiesDossieId
);

export const getTiposDossieList: any = createSelector(
    schemaSelectors2.getNormalizedEntities,
    getTiposDossieListIds,
    schemaSelectors2.entitiesProjector
);

export const getPagination: any = createSelector(
    getInteressadoListState,
    (state: ProcessoSolicitarDossiesState) => state.pagination
);

export const getInteressadoListLoaded: any = createSelector(
    getInteressadoListState,
    (state: ProcessoSolicitarDossiesState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getInteressadoListState,
    (state: ProcessoSolicitarDossiesState) => state.loading
);

export const getIsLoadingInteressados: any = createSelector(
    getInteressadoListState,
    (state: ProcessoSolicitarDossiesState) => state.loadingInteressados
);
