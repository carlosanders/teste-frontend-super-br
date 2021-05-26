import {createSelector} from '@ngrx/store';
import {getRootLotacaoListAppState, RootLotacaoListAppState, RootLotacaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getRootLotacaoListState = createSelector(
    getRootLotacaoListAppState,
    (state: RootLotacaoListAppState) => state.lotacaoList
);

export const getLotacaoListIds = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.entitiesId
);

export const getLotacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.pagination
);

export const getLotacaoListLoaded = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletingErrors
);
