import {createSelector} from '@ngrx/store';
import {CronjobListAppState, CronjobListState, getCronjobListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {cronjob as cronjobSchema} from '@cdk/normalizr';
import {Cronjob} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Cronjob>(cronjobSchema);

export const getCronjobListState: any = createSelector(
    getCronjobListAppState,
    (state: CronjobListAppState) => state.cronjobList
);

export const getCronjobListIds: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.entitiesId
);

export const getCronjobList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCronjobListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.pagination
);

export const getCronjobListLoaded: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.deletingErrors
);

export const getExecutingIds: any = createSelector(
    getCronjobListState,
    (state: CronjobListState) => state.executingIds
);
