import {createSelector} from '@ngrx/store';
import {ServidorEmailListAppState, ServidorEmailListState, getServidorEmailListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';
import {ServidorEmail} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<ServidorEmail>(servidorEmailSchema);

export const getServidorEmailListState: any = createSelector(
    getServidorEmailListAppState,
    (state: ServidorEmailListAppState) => state.servidorEmailList
);

export const getServidorEmailListIds: any = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.entitiesId
);

export const getServidorEmailList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getServidorEmailListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.pagination
);

export const getServidorEmailListLoaded: any = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getServidorEmailListState,
    (state: ServidorEmailListState) => state.deletingErrors
);
