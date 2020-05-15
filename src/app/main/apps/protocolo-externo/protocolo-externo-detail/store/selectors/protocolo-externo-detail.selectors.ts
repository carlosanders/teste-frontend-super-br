import {createSelector} from '@ngrx/store';
import {getProcessoDetailAppState, ProcessoDetailAppState, ProcessoDetailState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Processo, Documento} from '@cdk/models';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getProcessoState = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state.processoDetail
);

export const getSavingVincEtiquetaId = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.savingVincEtiquetaId
);

export const getIsLoading = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loading
);

export const getIsSaving = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loaded
);

export const getProcessoId = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loaded ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getErrors = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.documentosLoaded
);
