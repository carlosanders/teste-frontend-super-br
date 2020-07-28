import {createSelector} from '@ngrx/store';
import {
    getCompartilhamentoListAppState,
    CompartilhamentoListAppState,
    CompartilhamentoListState
} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(compartilhamentoSchema);

export const getCompartilhamentoListState = createSelector(
    getCompartilhamentoListAppState,
    (state: CompartilhamentoListAppState) => state.compartilhamentoList
);

export const getCompartilhamentoListIds = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.entitiesId
);

export const getCompartilhamentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCompartilhamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.pagination
);

export const getCompartilhamentoListLoaded = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.deletedIds
);