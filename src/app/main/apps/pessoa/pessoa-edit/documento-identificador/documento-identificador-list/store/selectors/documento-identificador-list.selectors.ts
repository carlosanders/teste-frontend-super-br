import {createSelector} from '@ngrx/store';
import {
    DocumentoIdentificadorListAppState,
    DocumentoIdentificadorListState,
    getDocumentoIdentificadorListAppState
} from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';
import {DocumentoIdentificador} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<DocumentoIdentificador>(documentoIdentificadorchema);

export const getDocumentoIdentificadorListState: any = createSelector(
    getDocumentoIdentificadorListAppState,
    (state: DocumentoIdentificadorListAppState) => state.documentoIdentificadorList
);

export const getDocumentoIdentificadorListIds: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.entitiesId
);

export const getDocumentoIdentificadorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentoIdentificadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.pagination
);

export const getDocumentoIdentificadorListLoaded: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getDocumentoIdentificadorListState,
    (state: DocumentoIdentificadorListState) => state.deletingErrors
);
