import {createSelector} from '@ngrx/store';
import {
    AtividadeListAppState,
    AtividadeListState,
    getAtividadeListAppState
} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Atividade>(atividadeSchema);

export const getAtividadeListState = createSelector(
    getAtividadeListAppState,
    (state: AtividadeListAppState) => state.atividadeList
);

export const getAtividadeListIds = createSelector(
    getAtividadeListState,
    (state: AtividadeListState) => state.entitiesId
);

export const getAtividadeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAtividadeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAtividadeListState,
    (state: AtividadeListState) => state.pagination
);

export const getAtividadeListLoaded = createSelector(
    getAtividadeListState,
    (state: AtividadeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAtividadeListState,
    (state: AtividadeListState) => state.loading
);
