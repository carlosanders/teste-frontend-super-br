import {createSelector} from '@ngrx/store';
import {
    getCompartilhamentoListAppState,
    CompartilhamentoListAppState,
    CompartilhamentoListState
} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr/compartilhamento.schema';
import {Compartilhamento} from '@cdk/models/compartilhamento.model';

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
