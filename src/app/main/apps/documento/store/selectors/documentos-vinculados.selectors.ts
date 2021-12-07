import {createSelector} from '@ngrx/store';
import {DocumentoAppState, DocumentosVinculadosState, getDocumentoAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosVinculadosState: any = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documentosVinculados
);

export const getDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosId
);

export const getDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosVinculadosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosVinculadosHasLoaded: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosLoaded
);

export const getDeletingDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.assinandoDocumentoIds
);

export const getSelectedDocumentosVinculadosIds: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.selectedDocumentosId
);

export const getSelectedDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosVinculadosIds,
    schemaDocumentoSelectors.entitiesProjector
);
