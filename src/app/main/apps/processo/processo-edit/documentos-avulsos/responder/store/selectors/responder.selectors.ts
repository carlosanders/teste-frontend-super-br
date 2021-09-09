import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoResponderAppState,
    DocumentoAvulsoResponderState,
    getDocumentoAvulsoResponderAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento, DocumentoAvulso} from '@cdk/models';
import {documento as documentoSchema, documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoAvulsoResponderState = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state.documentoAvulso
);

export const getDocumentoAvulsoId = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.saving
);

export const getHasLoaded = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.loaded
);

export const getErrors = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.errors
);

export const getDocumentosState = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state ? state.documentoAvulso : null
);

export const getDocumentosId = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosId
);


export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.documentosLoaded
);

export const getSelectedDocumentoIds = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.selectedDocumentosId
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoAllDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.convertendoDocumentoHtmlIds
);


export const getDeletingDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.assinandoDocumentoIds
);

export const getDocumentosComplementaresHasLoaded = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosLoaded
);

export const getDocumentosComplementaresId = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosId
);

export const getDocumentosComplementares = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

