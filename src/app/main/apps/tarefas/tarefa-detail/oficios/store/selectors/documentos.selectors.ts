import {createSelector} from '@ngrx/store';
import {getTarefaOficiosAppState, TarefaOficiosAppState, DocumentosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaOficiosDocumentosState = createSelector(
    getTarefaOficiosAppState,
    (state: TarefaOficiosAppState) => state ? state.documentos : null
);

export const getDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.alterandoDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.convertendoDocumentoIds
);

export const getUnDeletingDocumentosId = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.undeletingDocumentoIds
);

export const getBufferingDelete = createSelector(
    getTarefaOficiosDocumentosState,
    (state: DocumentosState) => state.bufferingDelete
);