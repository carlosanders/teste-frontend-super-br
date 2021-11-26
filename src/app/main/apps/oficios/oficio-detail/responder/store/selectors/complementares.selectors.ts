import {createSelector} from '@ngrx/store';
import {ResponderAppState, ComplementaresState, getResponderAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getComplementaresState: any = createSelector(
    getResponderAppState,
    (state: ResponderAppState) => state ? state.complementares : null
);

export const getDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.documentosId
);

export const getDocumentosComplementares: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentosComplementares: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.loading
);

export const getIsSavingDocumentosComplementares: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.saving
);

export const getDocumentosComplementaresHasLoaded: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.documentosLoaded
);

export const getSelectedDocumentoComplementaresIds: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.selectedDocumentosId
);

export const getSelectedDocumentosComplementares: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoComplementaresIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoAllDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => [
            ...state.convertendoDocumentoIds,
            ...state.convertendoDocumentoHtmlIds
        ]
);

export const getConvertendoDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosComplementaresHtmlId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.convertendoDocumentoHtmlIds
);

export const getDeletingDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosComplementaresId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.alterandoDocumentoIds
);

export const getDownloadDocumentosComplementaresP7SId: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.downloadDocumentosP7SIds
);

export const getDocumentosComplementaresPagination: any = createSelector(
    getComplementaresState,
    (state: ComplementaresState) => state.pagination
);

