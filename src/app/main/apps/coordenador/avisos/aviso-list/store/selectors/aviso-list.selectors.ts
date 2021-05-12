import {createSelector} from '@ngrx/store';
import {
    getAvisoListAppState,
    AvisoListAppState,
    AvisoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {aviso as avisoSchema} from '@cdk/normalizr';
import {Aviso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Aviso>(avisoSchema);

export const getAvisoListState = createSelector(
    getAvisoListAppState,
    (state: AvisoListAppState) => state.avisoList
);

export const getAvisoListIds = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.entitiesId
);

export const getAvisoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAvisoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.pagination
);

export const getAvisoListLoaded = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAvisoListState,
    (state: AvisoListState) => state.deletedIds
);
