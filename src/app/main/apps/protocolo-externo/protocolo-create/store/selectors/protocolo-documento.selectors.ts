import {createSelector} from '@ngrx/store';
import {getProtocoloCreateAppState, ProtocoloCreateAppState, ProtocoloDocumentoState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getProtocoloDocumentoState = createSelector(
    getProtocoloCreateAppState,
    (state: ProtocoloCreateAppState) => state.protocoloDocumento
);

export const getIsSavingProtocoloDocumento = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.saving
);

export const getErrorsProtocoloDocumento = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.errors
);

export const getDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getAssinandoDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.assinandoDocumentoIds
);

export const getDocumentosHasLoaded = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.deletingDocumentoIds
);

export const getConvertendoAllDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => {
        return [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ];
    }
);

export const getConvertendoDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.convertendoDocumentoHtmlIds
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getProtocoloDocumentoState,
    (state: ProtocoloDocumentoState) => state.removendoAssinaturaDocumentoIds
);




