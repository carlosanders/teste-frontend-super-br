import {createSelector} from '@ngrx/store';
import {
    AtividadeBlocoCreateDocumentosState,
    AtividadeCreateBlocoAppState,
    getAtividadeCreateBlocoAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateBlocoDocumentosState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state ? state.atividadeCreateBlocoDocumentos : null
);

export const getDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.assinandoDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
