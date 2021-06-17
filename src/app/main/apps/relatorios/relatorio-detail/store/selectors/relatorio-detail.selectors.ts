import {createSelector} from '@ngrx/store';
import {
    getRelatorioDetailAppState,
    RelatorioDetailAppState,
    RelatorioDetailState
} from 'app/main/apps/relatorios/relatorio-detail/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, relatorio as relatorioSchema} from '@cdk/normalizr';
import {Relatorio} from '@cdk/models/relatorio.model';
import {Documento} from '@cdk/models';

const schemaRelatorioSelectors = createSchemaSelectors<Relatorio>(relatorioSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getRelatorioState = createSelector(
    getRelatorioDetailAppState,
    (state: RelatorioDetailAppState) => state.relatorioDetail
);

export const getSavingVincEtiquetaId = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.savingVincEtiquetaId
);

export const getIsLoading = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loading
);

export const getIsSaving = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loaded
);

export const getRelatorioId = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loaded ? state.loaded.value : null
);

export const getRelatorio = createSelector(
    schemaRelatorioSelectors.getNormalizedEntities,
    getRelatorioId,
    schemaRelatorioSelectors.entityProjector
);

export const getErrors = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.documentosLoaded
);
