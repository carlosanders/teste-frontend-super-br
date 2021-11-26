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

export const getAtividadeCreateBlocoDocumentosState: any = createSelector(
    getMinutasAppState,
    (state: MinutasAppState) => state ? state.minutas : null
);

export const getDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.documentosLoaded
);

export const getDeletingDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.assinandoDocumentoIds
);

export const getRemovendoAssinaturaDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.removendoAssinaturaDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.alterandoDocumentoIds
);

export const getConvertendoDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.downloadDocumentosP7SIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: MinutasState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
