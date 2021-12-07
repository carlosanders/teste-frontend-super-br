import {createSelector} from '@ngrx/store';
import {getRelevanciaListAppState, RelevanciaListAppState, RelevanciaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';
import {Relevancia} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Relevancia>(relevanciaSchema);

export const getRelevanciaListState: any = createSelector(
    getRelevanciaListAppState,
    (state: RelevanciaListAppState) => state.relevanciaList
);

export const getRelevanciaListIds: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.entitiesId
);

export const getRelevanciaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelevanciaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.pagination
);

export const getRelevanciaListLoaded: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRelevanciaListState,
    (state: RelevanciaListState) => state.deletingErrors
);
