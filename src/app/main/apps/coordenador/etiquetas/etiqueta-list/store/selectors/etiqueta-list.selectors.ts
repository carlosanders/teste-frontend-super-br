import {createSelector} from '@ngrx/store';
import {EtiquetaListAppState, EtiquetaListState, getEtiquetaListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';
import {Etiqueta} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);

export const getEtiquetaListState: any = createSelector(
    getEtiquetaListAppState,
    (state: EtiquetaListAppState) => state.etiquetaList
);

export const getEtiquetaListIds: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.entitiesId
);

export const getEtiquetaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEtiquetaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.pagination
);

export const getEtiquetaListLoaded: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEtiquetaListState,
    (state: EtiquetaListState) => state.deletingErrors
);
