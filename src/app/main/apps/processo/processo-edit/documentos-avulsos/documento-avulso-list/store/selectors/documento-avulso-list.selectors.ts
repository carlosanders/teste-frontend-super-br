import {createSelector} from '@ngrx/store';
import {
    getDocumentoAvulsoListAppState,
    DocumentoAvulsoListAppState,
    DocumentoAvulsoListState
} from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';
import {DocumentoAvulso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentoAvulsoListState = createSelector(
    getDocumentoAvulsoListAppState,
    (state: DocumentoAvulsoListAppState) => state.documentoAvulsoList
);

export const getDocumentoAvulsoListIds = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.entitiesId
);

export const getDocumentoAvulsoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentoAvulsoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.pagination
);

export const getDocumentoAvulsoListLoaded = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.deletedIds
);

export const getRespondendoIds = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.respondendoIds
);

export const getRespodendoDocumentosAvulsos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRespondendoIds,
    schemaSelectors.entitiesProjector
);
