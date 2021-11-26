import {createSelector} from '@ngrx/store';
import {getTransicaoListAppState, TransicaoListAppState, TransicaoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import {Transicao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Transicao>(transicaoSchema);

export const getTransicaoListState: any = createSelector(
    getTransicaoListAppState,
    (state: TransicaoListAppState) => state.transicaoList
);

export const getTransicaoListIds: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.entitiesId
);

export const getTransicaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTransicaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.pagination
);

export const getTransicaoListLoaded: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getTransicaoListState,
    (state: TransicaoListState) => state.deletingErrors
);
