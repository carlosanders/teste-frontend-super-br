import { createSelector } from '@ngrx/store';
import {
    getDocumentoAvulsoDetailAppState,
    DocumentoAvulsoDetailAppState,
    DocumentoAvulsoDetailState } from 'app/main/apps/oficios/oficio-detail/store/reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema } from '@cdk/normalizr/documento-avulso.schema';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';
import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';
import { Documento } from '@cdk/models/documento.model';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoAvulsoState = createSelector(
    getDocumentoAvulsoDetailAppState,
    (state: DocumentoAvulsoDetailAppState) => state.documentoAvulsoDetail
);

export const getIsLoading = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.loading
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.loaded
);

export const getDocumentoAvulsoId = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getErrors = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoDetailState) => state.documentosLoaded
);
