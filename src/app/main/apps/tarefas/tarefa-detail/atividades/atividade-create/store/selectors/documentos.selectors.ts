import {createSelector} from '@ngrx/store';
import {getAtividadeCreateAppState, AtividadeCreateAppState, AtividadeCreateDocumentosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateDocumentosState = createSelector(
    getAtividadeCreateAppState,
    (state: AtividadeCreateAppState) => state ? state.atividadeCreateDocumentos : null
);

export const getDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.assinandoDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
