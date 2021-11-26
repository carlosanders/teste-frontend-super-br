import {createSelector} from '@ngrx/store';
import {getNomeListAppState, NomeListAppState, NomeListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {nome as nomeSchema} from '@cdk/normalizr';
import {Nome} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Nome>(nomeSchema);

export const getNomeListState: any = createSelector(
    getNomeListAppState,
    (state: NomeListAppState) => state.nomeList
);

export const getNomeListIds: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.entitiesId
);

export const getNomeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNomeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.pagination
);

export const getNomeListLoaded: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletingErrors
);
