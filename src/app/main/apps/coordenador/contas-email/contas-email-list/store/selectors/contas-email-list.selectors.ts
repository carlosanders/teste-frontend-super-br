import {createSelector} from '@ngrx/store';
import {ContaEmailListAppState, ContaEmailListState, getContaEmailListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';
import {ContaEmail} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ContaEmail>(contaEmailSchema);

export const getContaEmailListState = createSelector(
    getContaEmailListAppState,
    (state: ContaEmailListAppState) => state.contaEmailList
);

export const getContaEmailListIds = createSelector(
    getContaEmailListState,
    (state: ContaEmailListState) => state.entitiesId
);

export const getContaEmailList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getContaEmailListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getContaEmailListState,
    (state: ContaEmailListState) => state.pagination
);

export const getContaEmailListLoaded = createSelector(
    getContaEmailListState,
    (state: ContaEmailListState) => state.loaded
);

export const getIsLoading = createSelector(
    getContaEmailListState,
    (state: ContaEmailListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getContaEmailListState,
    (state: ContaEmailListState) => state.deletingErrors
);
