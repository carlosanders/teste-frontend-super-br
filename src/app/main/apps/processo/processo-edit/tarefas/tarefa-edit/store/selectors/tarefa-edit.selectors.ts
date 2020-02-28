import {createSelector} from '@ngrx/store';
import {getTarefaEditAppState, TarefaEditAppState, TarefaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tarefa} from '@cdk/models';
import {tarefa as tarefaSchema} from '@cdk/normalizr/tarefa.schema';

const schemaTarefaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefaEditState = createSelector(
    getTarefaEditAppState,
    (state: TarefaEditAppState) => state.tarefa
);

export const getTarefaId = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.loaded ? state.loaded.value : null
);

export const getTarefa = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.loaded
);

export const getErrors = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.errors
);
