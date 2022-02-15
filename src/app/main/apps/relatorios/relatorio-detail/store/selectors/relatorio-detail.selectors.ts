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

export const getRelatorioState: any = createSelector(
    getRelatorioDetailAppState,
    (state: RelatorioDetailAppState) => state.relatorioDetail
);

export const getSavingVincEtiquetaId: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.savingVincEtiquetaId
);

export const getIsLoading: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loading
);

export const getIsSaving: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loaded
);

export const getRelatorioId: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.loaded ? state.loaded.value : null
);

export const getRelatorio: any = createSelector(
    schemaRelatorioSelectors.getNormalizedEntities,
    getRelatorioId,
    schemaRelatorioSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.errors
);

export const getDocumentosId: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getRelatorioState,
    (state: RelatorioDetailState) => state.documentosLoaded
);
