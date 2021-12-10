import {createSelector} from '@ngrx/store';
import {getTarefasAppState, TarefasAppState, TarefasState} from 'app/main/apps/tarefas/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefasState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getMaximizado: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.maximizado
);

export const getTarefasIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.entitiesId
);

export const getTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getDraggedTarefasIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.draggingIds
);

export const getPagination: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.pagination
);

export const getTarefasLoaded: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getError: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.error
);

export const getErrorDelete: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDelete
);

export const getErrorDistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDistribuir
);

export const getDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.savingVinculacaoEtiquetaId
);

export const getUnDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.undeletingTarefaIds
);

export const getChangingFolderTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.changingFolderTarefaIds
);

export const getDeletedTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletedTarefaIds
);

export const getBufferingDelete: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDelete
);

export const getBufferingCiencia: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingCiencia
);

export const getBufferingRedistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingRedistribuir
);

export const getIsAssuntoLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingAssuntosProcessosId
);

export const getIsInteressadosLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingInteressadosProcessosId
);

export const getTotalInteressadosProcessosId: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.totalInteressadosProcessosId
);

export const getCienciaTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.cienciaTarefaIds
);

export const getRedistribuindoTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.redistribuindoTarefaIds
);

export const getIsTogglingUrgenteIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.togglingUrgenteIds
);

export const getIsClearForm: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.clearForm
);

export const getBufferingDistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDistribuir
);

export const getDistribuindoTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.distribuindoTarefaIds
);

export const getIsSavingObservacao: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.savingObservacao
);
