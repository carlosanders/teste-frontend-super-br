import {createSelector} from '@ngrx/store';
import {
    getTipoDocumentoListAppState,
    TipoDocumentoListAppState,
    TipoDocumentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';
import {TipoDocumento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoDocumento>(tipoDocumentoSchema);

export const getTipoDocumentoListState = createSelector(
    getTipoDocumentoListAppState,
    (state: TipoDocumentoListAppState) => state.tipoDocumentoList
);

export const getTipoDocumentoListIds = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.entitiesId
);

export const getTipoDocumentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoDocumentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.pagination
);

export const getTipoDocumentoListLoaded = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTipoDocumentoListState,
    (state: TipoDocumentoListState) => state.deletedIds
);