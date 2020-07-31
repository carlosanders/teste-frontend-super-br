import {createSelector} from '@ngrx/store';
import {
    getTarefaListAppState,
    TarefaListAppState,
    TarefaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefaListState = createSelector(
    getTarefaListAppState,
    (state: TarefaListAppState) => state.tarefaList
);

export const getTarefaListIds = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.entitiesId
);

export const getTarefaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.pagination
);

export const getTarefaListLoaded = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.deletedIds
);
