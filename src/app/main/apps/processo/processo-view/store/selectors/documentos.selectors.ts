import {createSelector} from '@ngrx/store';
import {
    getProcessoViewAppState,
    ProcessoViewAppState,
    ProcessoViewDocumentosState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getProcessoViewDocumentosState: any = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state ? state.documentos : null
);

export const getDocumentosId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.alterandoDocumentoIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentoP7SId: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.downloadP7SDocumentoIds
);

export const getLoadingDocumentosExcluidos: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.loadingDocumentosExcluidos
);

export const getMinutasLoading: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.loading
);

export const getLixeiraMinutas: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.lixeiraMinutas
);

export const getBufferingDelete: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.bufferingDelete
);

export const getRemovendoVinculacoesDocumentoIds: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.removendoVinculacoesDocumentoIds
);

export const getErrorsDocumentos: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.error
);

export const getErrorsDeleteVisibilidadeDocumentos: any = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.deleteVisibilidadeDocsIdsError
);
