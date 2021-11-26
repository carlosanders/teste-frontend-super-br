import {createSelector} from '@ngrx/store';
import {getSigiloListAppState, SigiloListAppState, SigiloListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {sigilo as sigiloSchema} from '@cdk/normalizr';
import {Sigilo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Sigilo>(sigiloSchema);

export const getSigiloListState: any = createSelector(
    getSigiloListAppState,
    (state: SigiloListAppState) => state.sigiloList
);

export const getSigiloListIds: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.entitiesId
);

export const getSigiloList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSigiloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.pagination
);

export const getSigiloListLoaded: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.deletingErrors
);
