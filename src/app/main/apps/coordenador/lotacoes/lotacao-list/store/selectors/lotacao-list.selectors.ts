import {createSelector} from '@ngrx/store';
import {
    getLotacaoListAppState,
    LotacaoListAppState,
    LotacaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getLotacaoListState = createSelector(
    getLotacaoListAppState,
    (state: LotacaoListAppState) => state.lotacaoList
);

export const getLotacaoListIds = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.entitiesId
);

export const getLotacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.pagination
);

export const getLotacaoListLoaded = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletingErrors
);
