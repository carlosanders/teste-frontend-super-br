import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, TarefaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefaState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.tarefas
);

export const getTarefasIds = createSelector(
    getTarefaState,
    (state: TarefaState) => state.entitiesId
);

export const getTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationTarefas = createSelector(
    getTarefaState,
    (state: TarefaState) => state.pagination
);

export const getTarefasLoaded = createSelector(
    getTarefaState,
    (state: TarefaState) => state.loaded
);

export const getIsTarefasLoading = createSelector(
    getTarefaState,
    (state: TarefaState) => state.loading
);
