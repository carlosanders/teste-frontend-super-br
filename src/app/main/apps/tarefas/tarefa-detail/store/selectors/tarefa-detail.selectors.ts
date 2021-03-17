import {createSelector} from '@ngrx/store';
import {getTarefaDetailAppState, TarefaDetailAppState, TarefaDetailState} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Documento} from '@cdk/models';
import {getRedistribuicaoEditBlocoState, RedistribuicaoEditBlocoState} from "../../../redistribuicao-edit-bloco/store";

const schemaTarefaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.tarefaDetail
);

export const getSavingVinculacaoEtiquetaId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.savingVinculacaoEtiquetaId
);

export const getIsLoading = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loading
);

export const getPluginLoading = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.pluginLoading
);

export const getIsSaving = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded
);

export const getTarefaId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded ? state.loaded.value : null
);

export const getTarefa = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

export const getErrors = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosLoaded
);

export const getBufferingCiencia = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.bufferingCiencia
);

export const getBufferingRedistribuir = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.bufferingRedistribuir
);

export const getRedistribuindoId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.redistribuindoId
);

export const getCienciaId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.cienciaId
);

export const getTarefaProcessoRestritoValidada = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.tarefaProcessoRestritoValidada
);
