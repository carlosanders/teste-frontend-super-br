import {createSelector} from '@ngrx/store';
import {getProcessoDetailAppState, ProcessoDetailAppState, ProcessoDetailState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, processo as processoSchema} from '@cdk/normalizr';
import {Documento, Processo} from '@cdk/models';

const schemaProcessoSelectors = createSchemaSelectors<Processo>(processoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getProcessoState: any = createSelector(
    getProcessoDetailAppState,
    (state: ProcessoDetailAppState) => state.processoDetail
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.savingVinculacaoEtiquetaId
);

export const getIsLoading: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loading
);

export const getIsSaving: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loaded
);

export const getProcessoId: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.loaded ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.errors
);

export const getDocumentosId: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getProcessoState,
    (state: ProcessoDetailState) => state.documentosLoaded
);
