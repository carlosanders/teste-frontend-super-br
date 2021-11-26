import {createSelector} from '@ngrx/store';
import {DocumentosState, getResponderAppState, ResponderAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState: any = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state ? state.documentos : null
);

export const getDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentos: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.loading
);

export const getIsSavingDocumentos: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.saving
);

export const getDocumentosHasLoaded: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosLoaded
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDeletingDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.downloadDocumentosP7SIds
);

