import {createSelector} from '@ngrx/store';
import {getTarefaCreateAppState, TarefaCreateAppState, ProcessoState} from '../reducers';
import {Processo} from '@cdk/models/processo.model';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoState = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state.processo
);

export const getProcessoId = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getProcessoIsLoading = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getVisibilidadeProcesso = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.restricaoProcesso
);

