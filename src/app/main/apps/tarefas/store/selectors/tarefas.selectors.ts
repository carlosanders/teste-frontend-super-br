import { createSelector } from '@ngrx/store';
import { getTarefasAppState, TarefasAppState, TarefasState } from 'app/main/apps/tarefas/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { tarefa as tarefaSchema } from '@cdk/normalizr';
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

export const getDraggedTarefasIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.draggingIds
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

export const getError = createSelector(
    getTarefasState,
    (state: TarefasState) => state.error
);

export const getErrorDelete = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDelete
);

export const getErrorDistribuir = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDistribuir
);

export const getDeletingTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getUnDeletingTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.undeletingTarefaIds
);

export const getChangingFolderTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.changingFolderTarefaIds
);

export const getDeletedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletedTarefaIds
);

export const getBufferingDelete = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDelete
);

export const getBufferingCiencia = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingCiencia
);

export const getBufferingRedistribuir = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingRedistribuir
);

export const getIsAssuntoLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingAssuntosProcessosId
);

export const getIsInteressadosLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingInteressadosProcessosId
);

export const getTotalInteressadosProcessosId = createSelector(
    getTarefasState,
    (state: TarefasState) => state.totalInteressadosProcessosId
);

export const getCienciaTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.cienciaTarefaIds
);

export const getRedistribuindoTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.redistribuindoTarefaIds
);

export const getIsTogglingUrgenteIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.togglingUrgenteIds
);

export const getIsClearForm = createSelector(
    getTarefasState,
    (state: TarefasState) => state.clearForm
);

export const getBufferingDistribuir = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDistribuir
);

export const getDistribuindoTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.distribuindoTarefaIds
);
