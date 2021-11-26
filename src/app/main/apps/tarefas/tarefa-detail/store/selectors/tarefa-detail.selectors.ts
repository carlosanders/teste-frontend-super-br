import {createSelector} from '@ngrx/store';
import {
    getTarefaDetailAppState,
    TarefaDetailAppState,
    TarefaDetailState
} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, tarefa as tarefaSchema} from '@cdk/normalizr';
import {Documento, Tarefa} from '@cdk/models';

const schemaTarefaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaState: any = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.tarefaDetail
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.savingVinculacaoEtiquetaId
);

export const getIsLoading: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loading
);

export const getPluginLoading: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.pluginLoading
);

export const getIsSaving: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded
);

export const getTarefaId: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded ? state.loaded.value : null
);

export const getTarefa: any = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.errors
);

export const getDocumentosId: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosLoaded
);

export const getBufferingCiencia: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.bufferingCiencia
);

export const getBufferingRedistribuir: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.bufferingRedistribuir
);

export const getRedistribuindoId: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.redistribuindoId
);

export const getCienciaId: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.cienciaId
);

export const getTarefaProcessoRestritoValidada: any = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.tarefaProcessoRestritoValidada
);
