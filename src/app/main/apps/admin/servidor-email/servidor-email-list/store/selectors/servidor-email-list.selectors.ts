import {createSelector} from '@ngrx/store';
import {ServidorEmailListAppState, ServidorEmailListState, getServidorEmailListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';
import {ServidorEmail} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ServidorEmail>(servidorEmailSchema);

export const getServidorEmailListState = createSelector(
    getServidorEmailListAppState,
    (state: ServidorEmailListAppState) => state.servidorEmailList
);

export const getServidorEmailListIds = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.entitiesId
);

export const getServidorEmailList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getServidorEmailListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.pagination
);

export const getServidorEmailListLoaded = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.loaded
);

export const getIsLoading = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.deletingErrors
);
