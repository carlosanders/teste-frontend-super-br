import {createSelector} from '@ngrx/store';
import {
    getRegraEtiquetaListAppState,
    RegraEtiquetaListAppState,
    RegraEtiquetaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';
import {RegraEtiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<RegraEtiqueta>(regraEtiquetaSchema);

export const getRegraEtiquetaListState = createSelector(
    getRegraEtiquetaListAppState,
    (state: RegraEtiquetaListAppState) => state.regraEtiquetaList
);

export const getRegraEtiquetaListIds = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.entitiesId
);

export const getRegraEtiquetaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRegraEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getRegraEtiquetaListLoaded = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletingErrors
);
