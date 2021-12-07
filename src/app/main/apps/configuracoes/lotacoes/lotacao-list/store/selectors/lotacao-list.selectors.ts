import {createSelector} from '@ngrx/store';
import {getLotacaoListAppState, LotacaoListAppState, LotacaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getLotacaoListState: any = createSelector(
    getLotacaoListAppState,
    (state: LotacaoListAppState) => state.lotacaoList
);

export const getLotacaoListIds: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.entitiesId
);

export const getLotacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.pagination
);

export const getLotacaoListLoaded: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getLotacaoListState,
    (state: LotacaoListState) => state.deletingErrors
);
