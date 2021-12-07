import {createSelector} from '@ngrx/store';
import {getRootLotacaoListAppState, RootLotacaoListAppState, RootLotacaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';

const schemaSelectors = createSchemaSelectors<Lotacao>(lotacaoSchema);

export const getRootLotacaoListState: any = createSelector(
    getRootLotacaoListAppState,
    (state: RootLotacaoListAppState) => state.lotacaoList
);

export const getLotacaoListIds: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.entitiesId
);

export const getLotacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLotacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.pagination
);

export const getLotacaoListLoaded: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRootLotacaoListState,
    (state: RootLotacaoListState) => state.deletingErrors
);
