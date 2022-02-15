import {createSelector} from '@ngrx/store';
import {CargoListAppState, CargoListState, getCargoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {cargo as cargoSchema} from '@cdk/normalizr';
import {Cargo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Cargo>(cargoSchema);

export const getCargoListState: any = createSelector(
    getCargoListAppState,
    (state: CargoListAppState) => state.cargoList
);

export const getCargoListIds: any = createSelector(
    getCargoListState,
    (state: CargoListState) => state.entitiesId
);

export const getCargoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCargoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getCargoListState,
    (state: CargoListState) => state.pagination
);

export const getCargoListLoaded: any = createSelector(
    getCargoListState,
    (state: CargoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCargoListState,
    (state: CargoListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getCargoListState,
    (state: CargoListState) => state.deletingErrors
);
