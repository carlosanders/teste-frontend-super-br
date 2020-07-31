import { createSelector } from '@ngrx/store';
import {
    getDocumentoAvulsoDetailAppState,
    OficioDetailAppState,
    OficioDetailState } from 'app/main/apps/oficios/oficio-detail/store/reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema } from '@cdk/normalizr';
import { documento as documentoSchema } from '@cdk/normalizr';
import { DocumentoAvulso } from '@cdk/models/documento-avulso.model';
import { Documento } from '@cdk/models/documento.model';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoAvulsoState = createSelector(
    getDocumentoAvulsoDetailAppState,
    (state: OficioDetailAppState) => state.oficioDetail
);

export const getIsLoading = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loading
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loaded
);

export const getDocumentoAvulsoId = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getErrors = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.documentosLoaded
);
