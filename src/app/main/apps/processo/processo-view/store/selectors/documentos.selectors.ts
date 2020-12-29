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

export const getProcessoViewDocumentosState = createSelector(
    getProcessoViewAppState,
    (state: ProcessoViewAppState) => state ? state.documentos : null
);

export const getDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.alterandoDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.convertendoDocumentoIds
);

export const getLoadingDocumentosExcluidos = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.loadingDocumentosExcluidos
);

export const getMinutasLoading = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.loading
);

export const getLixeiraMinutas = createSelector(
    getProcessoViewDocumentosState,
    (state: ProcessoViewDocumentosState) => state.lixeiraMinutas
);
