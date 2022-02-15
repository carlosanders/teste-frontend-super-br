import {createSelector} from '@ngrx/store';
import {AtividadeCreateAppState, AtividadeCreateDocumentosState, getAtividadeCreateAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateDocumentosState: any = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state ? state.atividadeCreateDocumentos : null
);

export const getDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentos: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.loading
);

export const getIsSavingDocumentos: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.saving
);

export const getDocumentosHasLoaded: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.alterandoDocumentoIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.downloadDocumentosP7SIds
);

export const getDocumentosExcluidos: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.loadDocumentosExcluidos
);

export const getLixeiraMinutas: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.lixeiraMinutas
);

export const getUnDeletingDocumentosId: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.undeletingDocumentoIds
);

export const getBufferingDelete: any = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.bufferingDelete
);
