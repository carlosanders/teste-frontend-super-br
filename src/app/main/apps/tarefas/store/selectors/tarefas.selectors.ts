import { createSelector } from '@ngrx/store';
import { getTarefasAppState, TarefasAppState, TarefasState } from 'app/main/apps/tarefas/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { tarefa as tarefaSchema } from '@cdk/normalizr/tarefa.schema';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefasState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getMaximizado = createSelector(
    getTarefasState,
    (state: TarefasState) => state.maximizado
);

export const getTarefasIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.entitiesId
);

export const getTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTarefasState,
    (state: TarefasState) => state.pagination
);

export const getTarefasLoaded = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getIsLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getDeletingTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getDeletedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletedTarefaIds
);

export const getIsAssuntoLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingAssuntosProcessosId
);
