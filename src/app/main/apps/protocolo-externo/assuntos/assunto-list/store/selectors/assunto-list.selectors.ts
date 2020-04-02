import {createSelector} from '@ngrx/store';
import {
    getAssuntoListAppState,
    AssuntoListAppState,
    AssuntoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr/assunto.schema';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoListState = createSelector(
    getAssuntoListAppState,
    (state: AssuntoListAppState) => state.assuntoList
);

export const getAssuntoListIds = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.entitiesId
);

export const getAssuntoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.pagination
);

export const getAssuntoListLoaded = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.deletedIds
);
