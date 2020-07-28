import {createSelector} from '@ngrx/store';
import {
    getDocumentoIdentificadorListAppState,
    DocumentoIdentificadorListAppState,
    DocumentoIdentificadorListState
} from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';
import {DocumentoIdentificador} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<DocumentoIdentificador>(documentoIdentificadorchema);

export const getDocumentoIdentificadorListState = createSelector(
    getDocumentoIdentificadorListAppState,
    (state: DocumentoIdentificadorListAppState) => state.documentoIdentificadorList
);

export const getDocumentoIdentificadorListIds = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.entitiesId
);

export const getDocumentoIdentificadorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentoIdentificadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.pagination
);

export const getDocumentoIdentificadorListLoaded = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.deletedIds
);
