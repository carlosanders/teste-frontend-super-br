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

export const getTarefasState: any = createSelector(
    getBoardTarefasAppState,
    (state: BoardTarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getSelectedTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getFolderTarefas: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.folderTarefas
);

export const getTarefasLoaded: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getTarefasIsLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getTarefasError: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.error
);

export const getDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getUnDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.undeletingTarefaIds
);

export const getChangingFolderTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.changingFolderTarefaIds
);

export const getIsTogglingUrgenteIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.togglingUrgenteIds
);

export const getTarefasIds: any = createSelector(
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

export const getFolderTarefasIsLoading: any = createSelector(
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

export const getTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getTarefasProcessoLoadingId: any = createSelector(
    getTarefasState,
    (state:TarefasState) => state.processoLoadingId
);

export const getTarefasProcessoInteressados: any = createSelector(
    getTarefasState,
    (state:TarefasState) => state.interessados
);

export const getTarefasSavingIds: any = createSelector(
    getTarefasState,
    (state:TarefasState) => state.savingIds
);

export const getTarefasSelected: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getTarefasExpandedIds: any = createSelector(
    getTarefasState,
    (state:TarefasState) => state.tarefasExpandedIds
);


