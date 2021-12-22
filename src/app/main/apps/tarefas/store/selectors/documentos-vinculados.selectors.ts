import {createSelector} from '@ngrx/store';
import {
    TarefasAppState,
    DocumentosVinculadosState,
    getTarefasAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosVinculadosState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.documentosVinculados
);

export const getDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosId
);

export const getDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosVinculadosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentosVinculados: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.loading
);

export const getIsSavingDocumentosVinculados: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.saving
);

export const getDocumentosVinculadosHasLoaded: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.documentosLoaded
);

export const getDeletingDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.deletingDocumentoIds
);

export const getSelectedDocumentosVinculadosIds: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.selectedDocumentosId
);

export const getAlterandoDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.alterandoDocumentoIds
);

export const getDocumentosVinculadosPagination: any = createSelector(
    getDocumentosVinculadosState,
    (state: DocumentosVinculadosState) => state.pagination
);

export const getSelectedDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosVinculadosIds,
    schemaDocumentoSelectors.entitiesProjector
);
