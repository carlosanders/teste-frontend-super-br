import {createSelector} from '@ngrx/store';
import {getAtividadeCreateBlocoAppState, AtividadeCreateBlocoAppState, AtividadeBlocoCreateDocumentosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateDocumentosState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state ? state.atividadeCreateDocumentos : null
);

export const getDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.assinandoDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
