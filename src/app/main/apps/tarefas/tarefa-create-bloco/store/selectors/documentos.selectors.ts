import {createSelector} from '@ngrx/store';
import {getTarefaCreateBlocoAppState, TarefaCreateBlocoAppState, TarefaCreateBlocoDocumentosState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaCreateBlocoDocumentosState = createSelector(
    getTarefaCreateBlocoAppState,
    (state: TarefaCreateBlocoAppState) => state ? state.tarefaCreateBlocoDocumentos : null
);

export const getDocumentosId = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.documentosLoaded
);

export const getDeletingDocumentosId = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.deletingDocumentoIds
);

export const getAssinandoDocumentosId = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.assinandoDocumentoIds
);

export const getSelectedDocumentoIds = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId = createSelector(
    getTarefaCreateBlocoDocumentosState,
    (state: TarefaCreateBlocoDocumentosState) => state.convertendoDocumentoIds
);