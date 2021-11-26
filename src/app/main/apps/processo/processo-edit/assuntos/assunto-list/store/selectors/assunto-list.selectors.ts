import {createSelector} from '@ngrx/store';
import {AssuntoListAppState, AssuntoListState, getAssuntoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assunto as assuntoSchema} from '@cdk/normalizr';
import {Assunto} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getAssuntoListState: any = createSelector(
    getAssuntoListAppState,
    (state: AssuntoListAppState) => state.assuntoList
);

export const getAssuntoListIds: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.entitiesId
);

export const getAssuntoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.pagination
);

export const getAssuntoListLoaded: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAssuntoListState,
    (state: AssuntoListState) => state.deletingErrors
);
