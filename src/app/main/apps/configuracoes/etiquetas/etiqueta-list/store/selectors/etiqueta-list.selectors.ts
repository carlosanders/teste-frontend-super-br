import {createSelector} from '@ngrx/store';
import {EtiquetaListAppState, EtiquetaListState, getEtiquetaListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {Etiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);

export const getEtiquetaListState = createSelector(
    getEtiquetaListAppState,
    (state: EtiquetaListAppState) => state.etiquetaList
);

export const getEtiquetaListIds = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.entitiesId
);

export const getEtiquetaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.pagination
);

export const getEtiquetaListLoaded = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletingErrors
);
