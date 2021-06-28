import { createSelector } from '@ngrx/store';
import {
    FolderTarefaState,
    getBoardTarefasAppState,
    BoardTarefasAppState,
    TarefasState
} from '../reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { tarefa as tarefaSchema } from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefasState = createSelector(
    getBoardTarefasAppState,
    (state: BoardTarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getSelectedTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getFolderTarefas = createSelector(
    getTarefasState,
    (state: TarefasState) => state.folderTarefas
);

export const getTarefasLoaded = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getTarefasIsLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getTarefasError = createSelector(
    getTarefasState,
    (state: TarefasState) => state.error
);

export const getTarefasErrorDelete = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDelete
);

export const getTarefasErrorDistribuir = createSelector(
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

export const getBufferingDistribuir = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDistribuir
);

export const getDistribuindoTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.distribuindoTarefaIds
);

export const getTarefasIds = createSelector(
    getFolderTarefas,
    (folderTarefaStareList: FolderTarefaState[]) => {
        const tarefasIds = [];
        folderTarefaStareList.forEach((folderTarefaState) => {
            folderTarefaState.entitiesId.forEach(id => {
                if (!tarefasIds.includes(id)) {
                    tarefasIds.push(id);
                }
            })
        })

        return tarefasIds;
    }
);

export const getFolderTarefasIsLoading = createSelector(
    getFolderTarefas,
    (states: FolderTarefaState[]) => {
        let isLoading = false;

        states.forEach(state => {
            if (state.loading === true) {
                isLoading = true;
            }
        });

        return isLoading;
    }
);

export const getTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getTarefasProcessoLoadingId = createSelector(
    getTarefasState,
    (state:TarefasState) => state.processoLoadingId
);

export const getTarefasProcessoInteressados = createSelector(
    getTarefasState,
    (state:TarefasState) => state.interessados
);

export const getTarefasSavingIds = createSelector(
    getTarefasState,
    (state:TarefasState) => state.savingIds
);

export const getTarefasSelected = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getTarefasExpandedIds = createSelector(
    getTarefasState,
    (state:TarefasState) => state.tarefasExpandedIds
);


