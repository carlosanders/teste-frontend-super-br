import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloDocumentoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getProtocoloDocumentoState: any = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocoloDocumento
);

export const getIsSavingProtocoloDocumento: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.saving
);

export const getIsLoadingProtocoloDocumento: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.loading
);

export const getErrorsProtocoloDocumento: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.errors
);

export const getDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getAssinandoDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.assinandoDocumentoIds
);

export const getDocumentosHasLoaded: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.documentosLoaded
);

export const getDeletingDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.deletingDocumentoIds
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.convertendoDocumentoHtmlIds
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getAlterandoDocumentosId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.downloadDocumentosP7SIds
);

export const getPagination: any = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.pagination
);



