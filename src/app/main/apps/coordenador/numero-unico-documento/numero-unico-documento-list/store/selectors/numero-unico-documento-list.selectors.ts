import {createSelector} from '@ngrx/store';
import {
    getNumeroUnicoDocumentoListAppState,
    NumeroUnicoDocumentoListAppState,
    NumeroUnicoDocumentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr';
import {NumeroUnicoDocumento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<NumeroUnicoDocumento>(numeroUnicoDocumentoSchema);

export const getNumeroUnicoDocumentoListState: any = createSelector(
    getNumeroUnicoDocumentoListAppState,
    (state: NumeroUnicoDocumentoListAppState) => state.numeroUnicoDocumentoList
);

export const getNumeroUnicoDocumentoListIds: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.entitiesId
);

export const getNumeroUnicoDocumentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNumeroUnicoDocumentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.pagination
);

export const getNumeroUnicoDocumentoListLoaded: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getNumeroUnicoDocumentoListState,
    (state: NumeroUnicoDocumentoListState) => state.deletingErrors
);
