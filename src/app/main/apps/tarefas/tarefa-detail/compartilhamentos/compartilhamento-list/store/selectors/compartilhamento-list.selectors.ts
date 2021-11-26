import {createSelector} from '@ngrx/store';
import {
    CompartilhamentoListAppState,
    CompartilhamentoListState,
    getCompartilhamentoListAppState
} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(compartilhamentoSchema);

export const getCompartilhamentoListState: any = createSelector(
    getCompartilhamentoListAppState,
    (state: CompartilhamentoListAppState) => state.compartilhamentoList
);

export const getCompartilhamentoListIds: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.entitiesId
);

export const getCompartilhamentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCompartilhamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.pagination
);

export const getCompartilhamentoListLoaded: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.deletedIds
);

export const getBufferingDelete: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.bufferingDelete
);

export const getDeletingErrors: any = createSelector(
    getCompartilhamentoListState,
    (state: CompartilhamentoListState) => state.deletingErrors
);
