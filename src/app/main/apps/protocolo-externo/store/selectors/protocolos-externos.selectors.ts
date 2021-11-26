import {createSelector} from '@ngrx/store';
import {getProtocoloExternoAppState, ProcessosAppState, ProcessosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';

import {processo as processoSchema} from '@cdk/normalizr';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessosState: any = createSelector(
    getProtocoloExternoAppState,
    (state: ProcessosAppState) => state.processos
);

export const getSelectedProcessoIds: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.selectedProcessoIds
);

export const getMaximizado: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.maximizado
);

export const getProcessosIds: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.entitiesId
);

export const getProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedProcessoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.pagination
);

export const getProcessosLoaded: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loading
);

export const getDeletingProcessoIds: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.deletingProcessoIds
);

export const getDeletedProcessoIds: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.deletedProcessoIds
);

export const getIsAssuntoLoading: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loadingAssuntosProcessosId
);

export const getIsInteressadoLoading: any = createSelector(
    getProcessosState,
    (state: ProcessosState) => state.loadingInteressadosProcessosId
);
