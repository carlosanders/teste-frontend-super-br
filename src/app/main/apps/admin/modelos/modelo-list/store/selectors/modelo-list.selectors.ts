import {createSelector} from '@ngrx/store';
import {getAdminModeloListAppState, AdminModeloListAppState, AdminModeloListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getAdminModeloListState: any = createSelector(
    getAdminModeloListAppState,
    (state: AdminModeloListAppState) => state.modeloList
);

export const getAdminModeloListIds: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.entitiesId
);

export const getAdminModeloList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAdminModeloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.pagination
);

export const getAdminModeloListLoaded: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAdminModeloListState,
    (state: AdminModeloListState) => state.deletingErrors
);
