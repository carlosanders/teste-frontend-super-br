import {createSelector, MemoizedSelector} from '@ngrx/store';
import {
    AtividadeBlocoCreateDocumentosState,
    AtividadeCreateBlocoAppState,
    getAtividadeCreateBlocoAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getAtividadeCreateBlocoDocumentosState: any = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state ? state.atividadeCreateBlocoDocumentos : null
);

export const getDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.documentosLoaded
);

export const getIsLoadingDocumentos: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.loading
);

export const getDocumentosHasLoadedTarefaId = (tarefaId: number): MemoizedSelector<any, any> => createSelector(
    getDocumentosHasLoaded,
    loaded => loaded[tarefaId]
);

export const getDeletingDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.deletingDocumentoIds
);

export const getAlterandoDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.alterandoDocumentoIds
);

export const getConvertendoDocumentosId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.convertendoDocumentoIds
);

export const getConvertendoDocumentosHtmlId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.convertendoDocumentoHtmlIds
);

export const getDownloadDocumentosP7SId: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.downloadDocumentosP7SIds
);

export const getSelectedDocumentoIds: any = createSelector(
    getAtividadeCreateBlocoDocumentosState,
    (state: AtividadeBlocoCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);
