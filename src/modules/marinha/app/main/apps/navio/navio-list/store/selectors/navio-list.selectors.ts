import {createSelector} from '@ngrx/store';
import {NavioListAppState, NavioListState, getNavioListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {navio as navioSchema} from '../../../../../../../@cdk/normalizr';
import {Navio} from '../../../../../../../@cdk/models/navio.model';

const schemaSelectors = createSchemaSelectors<Navio>(navioSchema);

export const getNavioListState: any = createSelector(
    getNavioListAppState,
    (state: NavioListAppState) => state.navioList
);

export const getNavioListIds: any = createSelector(
    getNavioListState,
    (state: NavioListState) => state.entitiesId
);

export const getNavioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNavioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getNavioListState,
    (state: NavioListState) => state.pagination
);

export const getNavioListLoaded: any = createSelector(
    getNavioListState,
    (state: NavioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getNavioListState,
    (state: NavioListState) => state.loading
);

export const getDeletingErrors: any = createSelector(
    getNavioListState,
    (state: NavioListState) => state.deletingErrors
);
