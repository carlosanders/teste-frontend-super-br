import { createSelector } from '@ngrx/store';
import { getProtocoloExternoAppState, ProcessosAppState, ProcessosState } from '../reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { processo as processoSchema } from '@cdk/normalizr/processo.schema';
import {Processo} from '@cdk/models';

import {Assunto} from '@cdk/models';
import { assunto as assuntoSchema } from '@cdk/normalizr/assunto.schema';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaAssuntoSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

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

/*
 * ISSUE-107 
 */
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


