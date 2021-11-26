import {createSelector} from '@ngrx/store';
import {DocumentosState, getTarefaOficiosAppState, TarefaOficiosAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaOficiosDocumentosState: any = createSelector(
    getTarefaOficiosAppState,
    (state: TarefaOficiosAppState) => state ? state.documentos : null
);

export const getDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.alterandoDocumentoIds
);

export const getAssinandoDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoAllDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getUnDeletingDocumentosId: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.undeletingDocumentoIds
);

export const getBufferingDelete: any = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.bufferingDelete
);
