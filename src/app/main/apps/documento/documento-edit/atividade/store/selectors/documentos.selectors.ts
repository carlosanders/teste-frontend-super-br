import {createSelector} from '@ngrx/store';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentosState, DocumentoEditAtividadeAppState, getDocumentoEditAtividadeAppState} from '../reducers';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState: any = createSelector(
    getDocumentoEditAtividadeAppState,
    (state: DocumentoEditAtividadeAppState) => state.documentos
);

export const getDocumentosHasLoaded: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.loaded ? state.loaded : false
);

export const getDocumentosIds: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosId
);

export const getDocumentosLoading: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.loading
);

export const getDocumentosPagination: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.pagination
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getSelectedDocumentoIds: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.selectedDocumentosId
);

export const getAlterandoDocumentosId: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.alterandoDocumentoIds
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsSavingMinutas: any = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.saving
);
