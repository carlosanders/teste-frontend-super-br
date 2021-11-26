import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoListAppState,
    DocumentoAvulsoListState,
    getDocumentoAvulsoListAppState
} from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentoAvulsoListState: any = createSelector(
    getDocumentoAvulsoListAppState,
    (state: DocumentoAvulsoListAppState) => state.documentoAvulsoList
);

export const getDocumentoAvulsoListIds: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.entitiesId
);

export const getDocumentoAvulsoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentoAvulsoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.pagination
);

export const getDocumentoAvulsoListLoaded: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.deletedIds
);

export const getRespondendoIds: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.respondendoIds
);

export const getRespodendoDocumentosAvulsos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRespondendoIds,
    schemaSelectors.entitiesProjector
);

export const getDeletingErrors: any = createSelector(
    getDocumentoAvulsoListState,
    (state: DocumentoAvulsoListState) => state.deletingErrors
);
