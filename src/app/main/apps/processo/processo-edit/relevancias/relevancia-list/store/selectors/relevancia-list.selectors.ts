import {createSelector} from '@ngrx/store';
import {
    getRelevanciaListAppState,
    RelevanciaListAppState,
    RelevanciaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';
import {Relevancia} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Relevancia>(relevanciaSchema);

export const getRelevanciaListState = createSelector(
    getRelevanciaListAppState,
    (state: RelevanciaListAppState) => state.relevanciaList
);

export const getRelevanciaListIds = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.entitiesId
);

export const getRelevanciaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelevanciaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.pagination
);

export const getRelevanciaListLoaded = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletingErrors
);
