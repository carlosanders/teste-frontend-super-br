import {createSelector} from '@ngrx/store';
import {
    getTransicaoListAppState,
    TransicaoListAppState,
    TransicaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import {Transicao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Transicao>(transicaoSchema);

export const getTransicaoListState = createSelector(
    getTransicaoListAppState,
    (state: TransicaoListAppState) => state.transicaoList
);

export const getTransicaoListIds = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.entitiesId
);

export const getTransicaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTransicaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.pagination
);

export const getTransicaoListLoaded = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletingErrors
);
