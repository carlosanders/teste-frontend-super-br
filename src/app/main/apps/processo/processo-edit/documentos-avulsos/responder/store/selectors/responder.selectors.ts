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

export const getDocumentoAvulsoResponderState: any = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state.documentoAvulso
);

export const getDocumentoAvulsoId: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso: any = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.loaded
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.errors
);

export const getDocumentosState: any = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state ? state.documentoAvulso : null
);

export const getDocumentosId: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosId
);


export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.documentosLoaded
);

export const getSelectedDocumentoIds: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.selectedDocumentosId
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentos: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.loading
);

export const getIsSavingDocumentos: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.saving
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.convertendoDocumentoHtmlIds
);


export const getDeletingDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.assinandoDocumentoIds
);

export const getDocumentosComplementaresHasLoaded: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosLoaded
);

export const getDocumentosComplementaresId: any = createSelector(
    getDocumentoAvulsoResponderState,
    (state: DocumentoAvulsoResponderState) => state.documentosId
);

export const getDocumentosComplementares: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getAlterandoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.downloadDocumentosP7SIds
);

export const getPagination: any = createSelector(
    getDocumentosState,
    (state: DocumentoAvulsoResponderState) => state.pagination
);

