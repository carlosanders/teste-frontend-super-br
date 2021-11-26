import {createSelector} from '@ngrx/store';
import {EspecieRelevanciaListAppState, EspecieRelevanciaListState, getEspecieRelevanciaListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr';
import {EspecieRelevancia} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieRelevancia>(especieRelevanciaSchema);

export const getEspecieRelevanciaListState: any = createSelector(
    getEspecieRelevanciaListAppState,
    (state: EspecieRelevanciaListAppState) => state.especieRelevanciaList
);

export const getEspecieRelevanciaListIds: any = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.entitiesId
);

export const getEspecieRelevanciaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieRelevanciaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.pagination
);

export const getEspecieRelevanciaListLoaded: any = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getEspecieRelevanciaListState,
    (state: EspecieRelevanciaListState) => state.deletingErrors
);
