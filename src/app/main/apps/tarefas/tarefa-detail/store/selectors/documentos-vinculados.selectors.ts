import {createSelector} from '@ngrx/store';
import * as fromStore from '../';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosVinculadosState: any = createSelector(
    fromStore.getTarefaDetailAppState,
    (state: fromStore.TarefaDetailAppState) => state.documentosVinculados
);

export const getDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.documentosId
);

export const getDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosVinculadosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getIsLoadingDocumentosVinculados: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.loading
);

export const getIsSavingDocumentosVinculados: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.saving
);

export const getDocumentosVinculadosHasLoaded: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.documentosLoaded
);

export const getDeletingDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.deletingDocumentoIds
);

export const getSelectedDocumentosVinculadosIds: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.selectedDocumentosId
);

export const getAlterandoDocumentosVinculadosId: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.alterandoDocumentoIds
);

export const getDocumentosVinculadosPagination: any = createSelector(
    getDocumentosVinculadosState,
    (state: fromStore.DocumentosVinculadosState) => state.pagination
);

export const getSelectedDocumentosVinculados: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentosVinculadosIds,
    schemaDocumentoSelectors.entitiesProjector
);
