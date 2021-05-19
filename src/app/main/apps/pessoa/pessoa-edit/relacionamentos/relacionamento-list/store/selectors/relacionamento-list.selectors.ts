import {createSelector} from '@ngrx/store';
import {
    getRelacionamentoListAppState,
    RelacionamentoListAppState,
    RelacionamentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr';
import {RelacionamentoPessoal} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<RelacionamentoPessoal>(relacionamentoSchema);

export const getRelacionamentoListState = createSelector(
    getRelacionamentoListAppState,
    (state: RelacionamentoListAppState) => state.relacionamentoList
);

export const getRelacionamentoListIds = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.entitiesId
);

export const getRelacionamentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelacionamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.pagination
);

export const getRelacionamentoListLoaded = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRelacionamentoListState,
    (state: RelacionamentoListState) => state.deletingErrors
);
