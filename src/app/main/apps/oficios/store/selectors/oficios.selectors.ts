import { createSelector } from '@ngrx/store';
import { getDocumentoAvulsoAppState, DocumentoAvulsoAppState, DocumentosAvulsoState } from 'app/main/apps/oficios/store/reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema } from '@cdk/normalizr/documento-avulso.schema';
import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';

const schemaSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentosAvulsoState = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state.documentosAvulso
);

export const getSelectedDocumentoAvulsoIds = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.selectedDocumentoAvulsoIds
);

export const getMaximizado = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.maximizado
);

export const getDocumentosAvulsoIds = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.entitiesId
);

export const getDocumentosAvulso = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentosAvulsoIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedDocumentosAvulso = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedDocumentoAvulsoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.pagination
);

export const getDocumentosAvulsoLoaded = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.loaded
);

export const getIsLoading = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.loading
);
