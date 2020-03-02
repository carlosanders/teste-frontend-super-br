import {createSelector} from '@ngrx/store';
import {getDocumentoAppState, DocumentoAppState, DocumentosVinculadosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosVinculadosState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documentosVinculados
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

export const getSelectedDocumentosVinculadosIds = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.selectedDocumentosId
);

export const getSelectedDocumentosVinculados = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosVinculadosIds,
    schemaDocumentoSelectors.entitiesProjector
);
