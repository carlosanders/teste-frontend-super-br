import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoEditAnexosAppState,
    DocumentosVinculadosState,
    getDocumentoAvulsoEditAnexosAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosVinculadosState = createSelector(
    getDocumentoAvulsoEditAnexosAppState,
    (state: DocumentoAvulsoEditAnexosAppState) => state.documentosVinculados
);

export const getDocumentosVinculadosId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosId
);

export const getDocumentosVinculados = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosVinculadosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentosVinculados = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.loading
);

export const getIsSavingDocumentosVinculados = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.saving
);

export const getDocumentosVinculadosHasLoaded = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosLoaded
);

export const getDeletingDocumentosVinculadosId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosVinculadosId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.removendoAssinaturaDocumentoIds
);

export const getSelectedDocumentosVinculadosIds = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.selectedDocumentosId
);

export const getAlterandoDocumentosId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosP7SId = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.downloadDocumentosP7SIds
);

export const getDocumentosVinculadosPagination = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.pagination
);

export const getSelectedDocumentosVinculados = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosVinculadosIds,
    schemaDocumentoSelectors.entitiesProjector
);
