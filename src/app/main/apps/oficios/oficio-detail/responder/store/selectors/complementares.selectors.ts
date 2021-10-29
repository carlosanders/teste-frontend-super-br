import {createSelector} from '@ngrx/store';
import {ResponderAppState, ComplementaresState, getResponderAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getComplementaresState = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state ? state.complementares : null
);

export const getDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.documentosId
);

export const getDocumentosComplementares = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentosComplementares = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.loading
);

export const getIsSavingDocumentosComplementares = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.saving
);

export const getDocumentosComplementaresHasLoaded = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.documentosLoaded
);

export const getSelectedDocumentoComplementaresIds = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.selectedDocumentosId
);

export const getSelectedDocumentosComplementares = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoComplementaresIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoAllDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosComplementaresHtmlId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.convertendoDocumentoHtmlIds
);

export const getDeletingDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosComplementaresId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosComplementaresP7SId = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.downloadDocumentosP7SIds
);

export const getDocumentosComplementaresPagination = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.pagination
);

