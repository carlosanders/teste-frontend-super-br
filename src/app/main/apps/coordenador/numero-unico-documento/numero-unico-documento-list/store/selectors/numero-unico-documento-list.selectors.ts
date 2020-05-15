import {createSelector} from '@ngrx/store';
import {
    getNumeroUnicoDocumentoListAppState,
    NumeroUnicoDocumentoListAppState,
    NumeroUnicoDocumentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr/numero-unico-documento.schema';
import {NumeroUnicoDocumento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<NumeroUnicoDocumento>(numeroUnicoDocumentoSchema);

export const getNumeroUnicoDocumentoListState = createSelector(
    getNumeroUnicoDocumentoListAppState,
    (state: NumeroUnicoDocumentoListAppState) => state.numeroUnicoDocumentoList
);

export const getNumeroUnicoDocumentoListIds = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.entitiesId
);

export const getNumeroUnicoDocumentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNumeroUnicoDocumentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.pagination
);

export const getNumeroUnicoDocumentoListLoaded = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.deletedIds
);
