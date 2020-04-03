import { createSelector } from '@ngrx/store';
import { getProtocoloExternoAppState, ProcessosAppState, ProcessosState } from '../reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { Processo, Assunto, Interessado } from '@cdk/models';

import { processo as processoSchema } from '@cdk/normalizr/processo.schema';
import { assunto as assuntoSchema } from '@cdk/normalizr/assunto.schema';
import { interessado as interessadoSchema } from '@cdk/normalizr/interessado.schema';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaAssuntoSelectors = createSchemaSelectors<Assunto>(assuntoSchema);
const schemaInteressadoSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getProcessosState = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.processos
);

export const getSelectedProcessoIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.selectedProcessoIds
);

export const getMaximizado = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.maximizado
);

export const getProcessosIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.entitiesId
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedProcessoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.pagination
);

export const getProcessosLoaded = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loaded
);

export const getIsLoading = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loading
);

export const getDeletingProcessoIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.deletingProcessoIds
);

export const getDeletedProcessoIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.deletedProcessoIds
);

export const getIsAssuntoLoading = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.assuntoLoading
);

export const getIsAssuntoPanelIsOpen = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.assuntoPanelOpen
);

export const getAssuntosProcessosIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.assuntosId
);

export const getAssuntosProcessos = createSelector(
    schemaAssuntoSelectors.getNormalizedEntities,
    getAssuntosProcessosIds,
    schemaAssuntoSelectors.entitiesProjector
);

export const getIdProcessoToLoadAssuntos = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.idProcessoToLoadAssuntos
);

export const getIsInteressadoLoading = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.interessadoLoading
);

export const getIsInteressadoPanelIsOpen = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.interessadoPanelOpen
);

export const getInteressadosProcessosIds = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.interessadosId
);

export const getInteressadosProcessos = createSelector(
    schemaInteressadoSelectors.getNormalizedEntities,
    getInteressadosProcessosIds,
    schemaInteressadoSelectors.entitiesProjector
);

export const getIdProcessoToLoadInteressados = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.idProcessoToLoadInteressados
);


