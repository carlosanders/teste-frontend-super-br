import {createSelector} from '@ngrx/store';
import {
    getGarantiaListAppState,
    GarantiaListAppState,
    GarantiaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {garantia as garantiaSchema} from '@cdk/normalizr/garantia.schema';
import {Garantia} from '@cdk/models/garantia.model';

const schemaSelectors = createSchemaSelectors<Garantia>(garantiaSchema);

export const getGarantiaListState = createSelector(
    getGarantiaListAppState,
    (state: GarantiaListAppState) => state.garantiaList
);

export const getGarantiaListIds = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.entitiesId
);

export const getGarantiaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getGarantiaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.pagination
);

export const getGarantiaListLoaded = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getGarantiaListState,
    (state: GarantiaListState) => state.deletedIds
);
