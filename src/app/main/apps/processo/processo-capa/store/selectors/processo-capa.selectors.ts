import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, ProcessoCapaState} from '../reducers';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoCapaState: any = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.processo
);

export const getErrors: any = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.errors
);

export const getProcessoId: any = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loaded ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded: any = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loaded
);

export const getProcessoIsLoading: any = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loading
);

export const getTogglingAcompanharProcesso: any = createSelector(
    getProcessoCapaState,
    (state: ProcessoCapaState) => state.loadingAcompanhamento
);
