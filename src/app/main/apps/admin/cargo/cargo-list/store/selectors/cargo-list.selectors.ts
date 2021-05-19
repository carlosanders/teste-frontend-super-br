import {createSelector} from '@ngrx/store';
import {
    getCargoListAppState,
    CargoListAppState,
    CargoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {cargo as cargoSchema} from '@cdk/normalizr';
import {Cargo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Cargo>(cargoSchema);

export const getCargoListState = createSelector(
    getCargoListAppState,
    (state: CargoListAppState) => state.cargoList
);

export const getCargoListIds = createSelector(
    getCargoListState,
    (state: CargoListState) => state.entitiesId
);

export const getCargoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCargoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getCargoListState,
    (state: CargoListState) => state.pagination
);

export const getCargoListLoaded = createSelector(
    getCargoListState,
    (state: CargoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getCargoListState,
    (state: CargoListState) => state.loading
);

export const getDeletingErrors = createSelector(
    getCargoListState,
    (state: CargoListState) => state.deletingErrors
);
