import {createSelector} from '@ngrx/store';
import {getTarefaListAppState, TarefaListAppState, TarefaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefaListState: any = createSelector(
    getTarefaListAppState,
    (state: TarefaListAppState) => state.tarefaList
);

export const getTarefaListIds: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.entitiesId
);

export const getTarefaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.pagination
);

export const getTarefaListLoaded: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTarefaListState,
    (state: TarefaListState) => state.deletingErrors
);
