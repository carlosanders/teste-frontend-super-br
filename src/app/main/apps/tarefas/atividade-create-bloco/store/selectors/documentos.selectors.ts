import {createSelector} from '@ngrx/store';
import {
    AtividadeBlocoCreateDocumentosState,
    AtividadeCreateBlocoAppState,
    getAtividadeCreateBlocoAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';
import {
    AtividadeCreateDocumentosState
} from "../../../tarefa-detail/atividades/atividade-create/store";

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

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.alterandoDocumentoIds
);

export const getConvertendoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.downloadDocumentosP7SIds
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
