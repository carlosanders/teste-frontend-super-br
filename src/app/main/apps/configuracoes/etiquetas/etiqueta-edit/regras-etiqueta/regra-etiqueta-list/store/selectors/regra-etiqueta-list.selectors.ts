import {createSelector} from '@ngrx/store';
import {getRegraEtiquetaListAppState, RegraEtiquetaListAppState, RegraEtiquetaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';
import {RegraEtiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<RegraEtiqueta>(regraEtiquetaSchema);

export const getRegraEtiquetaListState: any = createSelector(
    getRegraEtiquetaListAppState,
    (state: RegraEtiquetaListAppState) => state.regraEtiquetaList
);

export const getRegraEtiquetaListIds: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.entitiesId
);

export const getRegraEtiquetaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRegraEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.pagination
);

export const getRegraEtiquetaListLoaded: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRegraEtiquetaListState,
    (state: RegraEtiquetaListState) => state.deletingErrors
);
