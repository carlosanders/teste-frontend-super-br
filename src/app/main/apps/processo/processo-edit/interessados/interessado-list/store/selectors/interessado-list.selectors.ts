import {createSelector} from '@ngrx/store';
import {getInteressadoListAppState, InteressadoListAppState, InteressadoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {interessado as interessadoSchema} from '@cdk/normalizr';
import {Interessado} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Interessado>(interessadoSchema);

export const getInteressadoListState: any = createSelector(
    getInteressadoListAppState,
    (state: InteressadoListAppState) => state.interessadoList
);

export const getInteressadoListIds: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.entitiesId
);

export const getInteressadoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getInteressadoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.pagination
);

export const getInteressadoListLoaded: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getInteressadoListState,
    (state: InteressadoListState) => state.deletingErrors
);
