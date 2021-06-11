import {createSelector} from '@ngrx/store';
import {getInteressadoListAppState, InteressadoListAppState, InteressadoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoListState = createSelector(
    getInteressadoListAppState,
    (state: InteressadoListAppState) => state.interessadoList
);

export const getInteressadoListIds = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.entitiesId
);

export const getInteressadoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getInteressadoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.pagination
);

export const getInteressadoListLoaded = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletingErrors
);
