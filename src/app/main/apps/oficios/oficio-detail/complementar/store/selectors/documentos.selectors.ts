import { createSelector } from '@ngrx/store';
import { DocumentosState, getComplementarAppState, ComplementarAppState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { Documento } from '@cdk/models';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';


const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state ? state.documentos : null
);

export const getDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosId
);


export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosLoaded
);

export const getSelectedDocumentoIds = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoIds
);


export const getDeletingDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.assinandoDocumentoIds
);

