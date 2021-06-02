import { createSelector } from '@ngrx/store';
import { DocumentosState, getResponderAppState, ResponderAppState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { Documento } from '@cdk/models';
import { documento as documentoSchema } from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state ? state.documentos : null
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

export const getConvertendoAllDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoHtmlIds
);


export const getDeletingDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.assinandoDocumentoIds
);


