import {createSelector} from '@ngrx/store';
import {getTarefasAppState, TarefasAppState, TarefasState} from 'app/main/apps/tarefas/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema, vinculacaoEtiqueta as vinculacaoEtiquetaSchema, acao as acaoSchema} from '@cdk/normalizr';
import {Acao, Tarefa, VinculacaoEtiqueta} from '@cdk/models';
import {getRouterState} from 'app/store';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);
const schemaSelectorsVinculacoesEtiqueta = createSchemaSelectors<VinculacaoEtiqueta>(vinculacaoEtiquetaSchema);
const schemaSelectorsAcao = createSchemaSelectors<Acao>(acaoSchema);

export const getTarefaHandle: any = createSelector(
    getRouterState,
    router => router?.state.params['tarefaHandle']
);

export const getProcessoHandle: any = createSelector(
    getRouterState,
    router => router?.state.params['processoHandle']
);

export const getCurrentTarefa: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefaHandle,
    schemaSelectors.entityProjector
);

export const getTarefasState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getMaximizado: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.maximizado
);

export const getTarefasIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.entitiesId
);

export const getTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getDraggedTarefasIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.draggingIds
);

export const getPagination: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.pagination
);

export const getTarefasLoaded: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getIsTrocandoPastas: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.trocandoPastas
);

export const getError: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.error
);

export const getErrorDelete: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDelete
);

export const getErrorDistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.errorDistribuir
);

export const getDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getSavingVinculacaoEtiquetaId: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.savingVinculacaoEtiquetaId
);

export const getUnDeletingTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.undeletingTarefaIds
);

export const getChangingFolderTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.changingFolderTarefaIds
);

export const getDeletedTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletedTarefaIds
);

export const getBufferingDelete: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDelete
);

export const getBufferingCiencia: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingCiencia
);

export const getBufferingRedistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingRedistribuir
);

export const getIsAssuntoLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingAssuntosProcessosId
);

export const getIsInteressadosLoading: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingInteressadosProcessosId
);

export const getTotalInteressadosProcessosId: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.totalInteressadosProcessosId
);

export const getCienciaTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.cienciaTarefaIds
);

export const getRedistribuindoTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.redistribuindoTarefaIds
);

export const getIsTogglingUrgenteIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.togglingUrgenteIds
);

export const getIsClearForm: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.clearForm
);

export const getBufferingDistribuir: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.bufferingDistribuir
);

export const getDistribuindoTarefaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.distribuindoTarefaIds
);

export const getCurrentTarefaId: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.currentTarefaId
);

export const getSavingObservacaoIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.savingObservacaoIds
);

export const getTarefaById = (tarefaId: number): any => createSelector(
    schemaSelectors.getNormalizedEntities,
    (() => tarefaId),
    schemaSelectors.entityProjector
);

export const getVinculacoesEtiquetaIdsByTarefaId = (tarefaId: number): any => createSelector(
    getTarefaById(tarefaId),
    ((tarefa: Tarefa) => tarefa.vinculacoesEtiquetas)
);

export const getAllVinculacoesEtiqueta: any = createSelector(
    schemaSelectorsVinculacoesEtiqueta.getNormalizedEntities,
    schemaSelectorsVinculacoesEtiqueta.entitiesProjector
);

export const getVinculacaoEtiquetaByUuid = (uuid: string): any => createSelector(
    getAllVinculacoesEtiqueta,
    ((vinculacoesEtiqueta: VinculacaoEtiqueta[]) => vinculacoesEtiqueta?.find(vinculacao => vinculacao.objectUuid === uuid))
);

export const getVinculacaoEtiquetaByDocumentoId = (documentoId: number): any => createSelector(
    getAllVinculacoesEtiqueta,
    ((vinculacoesEtiqueta: VinculacaoEtiqueta[]) => vinculacoesEtiqueta?.find(vinculacao => vinculacao.objectId === documentoId))
);

export const getEditObservacaoIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.observacaoEditIds
);

export const getViewMode: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.viewMode
);

export const getLoadingAcoesEtiquetas: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loadingAcoes
);

export const getAcoesEtiquetaIds: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.acoesId
);

export const getAcoesEtiqueta: any = createSelector(
    schemaSelectorsAcao.getNormalizedEntities,
    getAcoesEtiquetaIds,
    schemaSelectorsAcao.entitiesProjector
);

export const getCollapsedGroups: any = createSelector(
    getTarefasState,
    (state: TarefasState) => state.collapsedGroups
);
