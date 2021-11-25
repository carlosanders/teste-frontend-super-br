import {createSelector} from '@ngrx/store';
import {
    MinutasState,
    MinutasAppState,
    getMinutasAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateBlocoDocumentosState = createSelector(
    getMinutasAppState,
    (state: MinutasAppState) => state ? state.minutas : null
);

export const getDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.alterandoDocumentoIds
);

export const getConvertendoDocumentosId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.downloadDocumentosP7SIds
);

export const getSelectedDocumentoIds = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
