import {createSelector} from '@ngrx/store';
import {getTarefaCreateAppState, ProcessoState, TarefaCreateAppState} from '../reducers';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getProcessoState: any = createSelector(
    getTarefaCreateAppState,
    (state: TarefaCreateAppState) => state.processo
);

export const getProcessoId: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getProcessoLoaded: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loaded
);

export const getProcessoIsLoading: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.loading
);

export const getVisibilidadeProcesso: any = createSelector(
    getProcessoState,
    (state: ProcessoState) => state.restricaoProcesso
);

