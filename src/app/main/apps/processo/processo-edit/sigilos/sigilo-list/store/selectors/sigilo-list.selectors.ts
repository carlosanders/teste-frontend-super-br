import {createSelector} from '@ngrx/store';
import {
    getSigiloListAppState,
    SigiloListAppState,
    SigiloListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {sigilo as sigiloSchema} from '@cdk/normalizr/sigilo.schema';
import {Sigilo} from '@cdk/models/sigilo.model';

const schemaSelectors = createSchemaSelectors<Sigilo>(sigiloSchema);

export const getSigiloListState = createSelector(
    getSigiloListAppState,
    (state: SigiloListAppState) => state.sigiloList
);

export const getSigiloListIds = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.entitiesId
);

export const getSigiloList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSigiloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.pagination
);

export const getSigiloListLoaded = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.loaded
);

export const getIsLoading = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.loading
);

export const getDeletingIds = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getSigiloListState,
    (state: SigiloListState) => state.deletedIds
);
