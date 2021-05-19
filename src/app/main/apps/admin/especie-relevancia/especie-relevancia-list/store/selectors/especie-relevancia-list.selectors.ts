import {createSelector} from '@ngrx/store';
import {
    getEspecieRelevanciaListAppState,
    EspecieRelevanciaListAppState,
    EspecieRelevanciaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr';
import {EspecieRelevancia} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieRelevancia>(especieRelevanciaSchema);

export const getEspecieRelevanciaListState = createSelector(
    getEspecieRelevanciaListAppState,
    (state: EspecieRelevanciaListAppState) => state.especieRelevanciaList
);

export const getEspecieRelevanciaListIds = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.entitiesId
);

export const getEspecieRelevanciaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieRelevanciaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.pagination
);

export const getEspecieRelevanciaListLoaded = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.deletingErrors
);
