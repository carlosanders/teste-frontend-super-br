import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, ProcessoCapaState} from '../reducers';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoCapaState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.processo
);

export const getErrors = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.errors
);

export const getProcessoId = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loaded ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loaded
);

export const getProcessoIsLoading = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loading
);

export const getIsAssuntoLoading = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loadingAssuntosProcessosId
);

export const getIsInteressadoLoading = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loadingInteressadosProcessosId
);
