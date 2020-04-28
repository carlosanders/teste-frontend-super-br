import {createSelector} from '@ngrx/store';
import {
    getEspecieTarefaListAppState,
    EspecieTarefaListAppState,
    EspecieTarefaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr/especie-tarefa.schema';
import {EspecieTarefa} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieTarefa>(especieTarefaSchema);

export const getEspecieTarefaListState = createSelector(
    getEspecieTarefaListAppState,
    (state: EspecieTarefaListAppState) => state.especieTarefaList
);

export const getEspecieTarefaListIds = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.entitiesId
);

export const getEspecieTarefaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieTarefaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.pagination
);

export const getEspecieTarefaListLoaded = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEspecieTarefaListState,
    (state: EspecieTarefaListState) => state.deletedIds
);