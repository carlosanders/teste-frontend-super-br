import {Action} from '@ngrx/store';

export const UNLOAD_TAREFAS = '[TAREFAS] UNLOAD TAREFAS';

export const GET_TAREFAS = '[TAREFAS] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[TAREFAS] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[TAREFAS] GET TAREFAS FAILED';

export const GET_TAREFA = '[TAREFAS] GET TAREFA';
export const GET_TAREFA_SUCCESS = '[TAREFAS] GET TAREFA SUCCESS';
export const GET_TAREFA_FAILED = '[TAREFAS] GET TAREFA FAILED';

export const GET_ETIQUETAS_TAREFAS = '[TAREFAS] GET ETIQUETAS TAREFA';
export const GET_ETIQUETAS_TAREFAS_SUCCESS = '[TAREFAS] GET ETIQUETAS TAREFA SUCCESS';
export const GET_ETIQUETAS_TAREFAS_FAILED = '[TAREFAS] GET ETIQUETAS TAREFA FAILED';

export const GET_WORKFLOW_TAREFA = '[TAREFAS] GET WORKFLOW TAREFA';
export const GET_WORKFLOW_TAREFA_SUCCESS = '[TAREFAS] GET WORKFLOW TAREFA SUCCESS';
export const GET_WORKFLOW_TAREFA_FAILED = '[TAREFAS] GET WORKFLOW TAREFA FAILED';

export const GET_ETIQUETA_MINUTA = '[TAREFAS] GET ETIQUETA MINUTA';
export const GET_ETIQUETA_MINUTA_SUCCESS = '[TAREFAS] GET ETIQUETA MINUTA SUCCESS';
export const GET_ETIQUETA_MINUTA_FAILED = '[TAREFAS] GET ETIQUETA MINUTA FAILED';

export const REMOVE_ETIQUETA_MINUTA_TAREFA = '[TAREFAS] REMOVE ETIQUETA MINUTA TAREFA';
export const REMOVE_ETIQUETA_OFICIO_TAREFA = '[TAREFAS] REMOVE ETIQUETA OFICIO TAREFA';
export const ATUALIZA_ETIQUETA_MINUTA = '[TAREFAS] ATUALIZA ETIQUETA MINUTA';

export const SET_CURRENT_TAREFA = '[TAREFAS] SET CURRENT TAREFA';
export const SET_CURRENT_TAREFA_SUCCESS = '[TAREFAS] SET CURRENT TAREFA SUCCESS';
export const SYNC_CURRENT_TAREFA_ID = '[TAREFAS] SYNC CURRENT TAREFA ID';

export const CREATE_TAREFA = '[TAREFAS] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFAS] CREATE TAREFA SUCCESS';

export const DELETE_TAREFA = '[TAREFAS] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFAS] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFAS] DELETE TAREFA FAILED';

export const UNDELETE_TAREFA = '[TAREFAS] UNDELETE TAREFA';
export const UNDELETE_TAREFA_SUCCESS = '[TAREFAS] UNDELETE TAREFA SUCCESS';
export const UNDELETE_TAREFA_FAILED = '[TAREFAS] UNDELETE TAREFA FAILED';

export const DELETE_TAREFA_FLUSH = '[TAREFAS] DELETE TAREFA FLUSH';
export const DELETE_TAREFA_CANCEL = '[TAREFAS] DELETE TAREFA CANCEL';
export const DELETE_TAREFA_CANCEL_SUCCESS = '[TAREFAS] DELETE TAREFA CANCEL SUCCESS';

export const CHANGE_SELECTED_TAREFAS = '[TAREFAS] CHANGE SELECTED TAREFAS';
export const CHANGE_DRAGGED_TAREFAS = '[TAREFAS] CHANGE DRAGGED TAREFAS';

export const REMOVE_TAREFA = '[TAREFAS] REMOVE TAREFA';

export const TOGGLE_MAXIMIZADO = '[TAREFAS] TOGGLE MAXIMIZADO';

export const TOGGLE_LIDA_TAREFA = '[TAREFAS] TOGGLE LIDA TAREFA';
export const TOGGLE_LIDA_TAREFA_SUCCESS = '[TAREFAS] TOGGLE LIDA TAREFA SUCCESS';
export const TOGGLE_LIDA_TAREFA_FAILED = '[TAREFAS] TOGGLE LIDA TAREFA FAILED';

export const TOGGLE_URGENTE_TAREFA = '[TAREFAS] TOGGLE URGENTE TAREFA';
export const TOGGLE_URGENTE_TAREFA_SUCCESS = '[TAREFAS] TOGGLE URGENTE TAREFA SUCCESS';
export const TOGGLE_URGENTE_TAREFA_FAILED = '[TAREFAS] TOGGLE URGENTE TAREFA FAILED';

export const SET_FOLDER_ON_SELECTED_TAREFAS_START = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS START';
export const SET_FOLDER_ON_SELECTED_TAREFAS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS SUCCESS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_FAILED = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS FAILED';
export const SET_FOLDER_ON_SELECTED_TAREFAS_FINISH = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS FINISH';

export const DISTRIBUIR_TAREFA = '[TAREFAS] DISTRIBUIR TAREFA';
export const DISTRIBUIR_TAREFA_SUCCESS = '[TAREFAS] DISTRIBUIR TAREFA SUCCESS';
export const DISTRIBUIR_TAREFA_FAILED = '[TAREFAS] DISTRIBUIR TAREFA FAILED';
export const DISTRIBUIR_TAREFA_FLUSH = '[TAREFAS] DISTRIBUIR TAREFA FLUSH';
export const DISTRIBUIR_TAREFA_CANCEL = '[TAREFAS] DISTRIBUIR TAREFA CANCEL';
export const DISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[TAREFAS] DISTRIBUIR TAREFA CANCEL SUCCESS';

export const SAVE_TAREFA = '[TAREFAS] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFAS] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFAS] SAVE TAREFA FAILED';

export const SAVE_ETIQUETA = '[TAREFAS] SAVE ETIQUETA';
export const SAVE_ETIQUETA_SUCCESS = '[TAREFAS] SAVE ETIQUETA SUCCESS';
export const SAVE_ETIQUETA_FAILED = '[TAREFAS] SAVE ETIQUETA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[TAREFAS] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFAS] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[TAREFAS] CREATE VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[TAREFAS] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFAS] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[TAREFAS] DELETE VINCULACAO_ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[TAREFAS] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFAS] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[TAREFAS] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const GET_ASSUNTOS_PROCESSO_TAREFA = '[TAREFAS] GET ASSUNTOS PROCESSO';
export const GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS = '[TAREFAS] GET ASSUNTOS PROCESSO SUCCESS';
export const GET_ASSUNTOS_PROCESSO_TAREFA_FAILED = '[TAREFAS] GET ASSUNTOS PROCESSO FAILED';

export const SET_LOADING_ASSUNTOS = '[TAREFAS] SET LOADING ASSUNTOS';
export const SET_LOADING_ASSUNTOS_SUCCESS = '[TAREFAS] SET LOADING ASSUNTOS SUCCESS';
export const SET_LOADING_ASSUNTOS_FAILED = '[TAREFAS] SET LOADING ASSUNTOS FAILED';

export const SET_ASSUNTOS_LOADED = '[TAREFAS] SET ASSUNTOS LOADED';
export const SET_ASSUNTOS_LOADED_SUCCESS = '[TAREFAS] SET ASSUNTOS LOADED SUCCESS';
export const SET_ASSUNTOS_LOADED_FAILED = '[TAREFAS] SET ASSUNTOS LOADED FAILED';

export const GET_INTERESSADOS_PROCESSO_TAREFA = '[TAREFAS] GET INTERESSADOS PROCESSO';
export const GET_INTERESSADOS_PROCESSO_TAREFA_SUCCESS = '[TAREFAS] GET INTERESSADOS PROCESSO SUCCESS';
export const GET_INTERESSADOS_PROCESSO_TAREFA_FAILED = '[TAREFAS] GET INTERESSADOS PROCESSO FAILED';

export const SET_LOADING_INTERESSADOS = '[TAREFAS] SET LOADING INTERESSADOS';
export const SET_LOADING_INTERESSADOS_SUCCESS = '[TAREFAS] SET LOADING INTERESSADOS SUCCESS';
export const SET_LOADING_INTERESSADOS_FAILED = '[TAREFAS] SET LOADING INTERESSADOS FAILED';

export const SET_INTERESSADOS_LOADED = '[TAREFAS] SET INTERESSADOS LOADED';
export const SET_INTERESSADOS_LOADED_SUCCESS = '[TAREFAS] SET INTERESSADOS LOADED SUCCESS';
export const SET_INTERESSADOS_LOADED_FAILED = '[TAREFAS] SET INTERESSADOS LOADED FAILED';

export const DAR_CIENCIA_TAREFA = '[TAREFAS] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[TAREFAS] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[TAREFAS] DAR CIENCIA TAREFA FAILED';

export const DAR_CIENCIA_TAREFA_CANCEL = '[TAREFAS] DAR CIENCIA TAREFA CANCEL';
export const DAR_CIENCIA_TAREFA_CANCEL_SUCCESS = '[TAREFAS] DAR CIENCIA TAREFA CANCEL SUCCESS';
export const DAR_CIENCIA_TAREFA_FLUSH = '[TAREFAS] DAR CIENCIA TAREFA FLUSH';

export const REDISTRIBUIR_TAREFA = '[TAREFAS] REDISTRIBUIR TAREFA';
export const REDISTRIBUIR_TAREFA_FAILED = '[TAREFAS] REDISTRIBUIR TAREFA FAILED';
export const REDISTRIBUIR_TAREFA_SUCCESS = '[TAREFAS] REDISTRIBUIR TAREFA SUCCESS';

export const REDISTRIBUIR_TAREFA_CANCEL = '[TAREFAS] REDISTRIBUIR TAREFA CANCEL';
export const REDISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[TAREFAS] REDISTRIBUIR TAREFA CANCEL SUCCESS';

export const GERAR_RELATORIO_TAREFA_EXCEL = '[TAREFAS] GERAR RELATORIO TAREFA EXCEL';
export const GERAR_RELATORIO_TAREFA_EXCEL_FAILED = '[TAREFAS] GERAR RELATORIO TAREFA EXCEL FAILED';
export const GERAR_RELATORIO_TAREFA_EXCEL_SUCCESS = '[TAREFAS] GERAR RELATORIO TAREFA EXCEL SUCCESS';

export const SAVE_OBSERVACAO = '[TAREFAS] SAVE OBSERVACAO';
export const SAVE_OBSERVACAO_SUCCESS = '[TAREFAS] SAVE OBSERVACAO SUCCESS';
export const SAVE_OBSERVACAO_FAILED = '[TAREFAS] SAVE OBSERVACAO FAILED';

export const EDITAR_OBSERVACAO = '[TAREFAS] EDITAR OBSERVACAO';

export const UPLOAD_CONCLUIDO = '[TAREFAS] UPLOAD CONCLUIDO';

export const CHANGE_VIEW_MODE = '[TAREFAS] CHANGE VIEW MODE';

export const GET_ACOES_ETIQUETA = '[TAREFAS] GET ACOES ETIQUETA';
export const GET_ACOES_ETIQUETA_SUCCESS = '[TAREFAS] GET ACOES ETIQUETA SUCCESS';
export const GET_ACOES_ETIQUETA_FAILED = '[TAREFAS] GET ACOES ETIQUETA FAILED';

export const APROVAR_SUGESTAO = '[TAREFAS] APROVAR SUGESTAO';
export const APROVAR_SUGESTAO_SUCCESS = '[TAREFAS] APROVAR SUGESTAO SUCCESS';
export const APROVAR_SUGESTAO_FAILED = '[TAREFAS] APROVAR SUGESTAO FAILED';

export const RELOAD_VINCULACAO_ETIQUETA = '[TAREFAS] RELOAD VINCULACAO_ETIQUETA';

export const TOGGLE_GROUP = '[TAREFAS] TOGGLE GROUP';

export const UNLOAD_GROUP = '[TAREFAS] UNLOAD GROUP';

export const CLEAR_ERROR = '[TAREFAS] CLEAR ERROR';

/**
 * Unload Tarefas
 */
export class UnloadTarefas implements Action {
    readonly type = UNLOAD_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas
 */
export class GetTarefas implements Action {
    readonly type = GET_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Success
 */
export class GetTarefasSuccess implements Action {
    readonly type = GET_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Failed
 */
export class GetTarefasFailed implements Action {
    readonly type = GET_TAREFAS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Get Etiquetas Tarefas
 */
export class GetEtiquetasTarefas implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiquetas Tarefas Success
 */
export class GetEtiquetasTarefasSuccess implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiquetas Tarefas Failed
 */
export class GetEtiquetasTarefasFailed implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Get Workflow Tarefa
 */
export class GetWorkflowTarefa implements Action {
    readonly type = GET_WORKFLOW_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Get Workflow Tarefa Success
 */
export class GetWorkflowTarefaSuccess implements Action {
    readonly type = GET_WORKFLOW_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Workflow Tarefa Failed
 */
export class GetWorkflowTarefaFailed implements Action {
    readonly type = GET_WORKFLOW_TAREFA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Get Etiqueta Minuta
 */
export class GetEtiquetaMinuta implements Action {
    readonly type = GET_ETIQUETA_MINUTA;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiqueta Minuta Success
 */
export class GetEtiquetaMinutaSuccess implements Action {
    readonly type = GET_ETIQUETA_MINUTA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiqueta Minuta Failed
 */
export class GetEtiquetaMinutaFailed implements Action {
    readonly type = GET_ETIQUETA_MINUTA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Remove Etiqueta Minuta Tarefa
 */
export class RemoveEtiquetaMinutaTarefa implements Action {
    readonly type = REMOVE_ETIQUETA_MINUTA_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Etiqueta Oficio Tarefa
 */
export class RemoveEtiquetaOficioTarefa implements Action {
    readonly type = REMOVE_ETIQUETA_OFICIO_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Atualiza Etiqueta Minuta
 */
export class AtualizaEtiquetaMinuta implements Action {
    readonly type = ATUALIZA_ETIQUETA_MINUTA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa
 */
export class GetTarefa implements Action {
    readonly type = GET_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefa Success
 */
export class GetTarefaSuccess implements Action {
    readonly type = GET_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefa Failed
 */
export class GetTarefaFailed implements Action {
    readonly type = GET_TAREFA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Select Tarefa
 */
export class SetCurrentTarefa implements Action {
    readonly type = SET_CURRENT_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Select Tarefa Success
 */
export class SetCurrentTarefaSuccess implements Action {
    readonly type = SET_CURRENT_TAREFA_SUCCESS;

    constructor() {
    }
}

/**
 * Sync Current Tarefa Id
 */
export class SyncCurrentTarefaId implements Action {
    readonly type = SYNC_CURRENT_TAREFA_ID;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Tarefa
 */
export class CreateTarefa implements Action {
    readonly type = CREATE_TAREFA;

    constructor() {
    }
}

/**
 * Creat Tarefa Success
 */
export class CreateTarefaSuccess implements Action {
    readonly type = CREATE_TAREFA_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected Tarefas
 */
export class ChangeSelectedTarefas implements Action {
    readonly type = CHANGE_SELECTED_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Change Dragged Tarefas
 */
export class ChangeDraggedTarefas implements Action {
    readonly type = CHANGE_DRAGGED_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Tarefas Start
 */
export class SetFolderOnSelectedTarefasStart implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_START;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Tarefas
 */
export class SetFolderOnSelectedTarefas implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Tarefas Success
 */
export class SetFolderOnSelectedTarefasSuccess implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Tarefas Failed
 */
export class SetFolderOnSelectedTarefasFailed implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Set Folder on Selected Tarefas Finish
 */
export class SetFolderOnSelectedTarefasFinish implements Action {
    readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_FINISH;

    constructor() {
    }
}

/**
 * Distribuir Tarefas
 */
export class DistribuirTarefas implements Action {
    readonly type = DISTRIBUIR_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Distribuir Tarefas Success
 */
export class DistribuirTarefasSuccess implements Action {
    readonly type = DISTRIBUIR_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Distribuir Tarefas Failed
 */
export class DistribuirTarefasFailed implements Action {
    readonly type = DISTRIBUIR_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Distribuir Tarefas Flush
 */
export class DistribuirTarefasFlush implements Action {
    readonly type = DISTRIBUIR_TAREFA_FLUSH;

    constructor() {
    }
}

/**
 * Distribuir Tarefas Cancel
 */
export class DistribuirTarefasCancel implements Action {
    readonly type = DISTRIBUIR_TAREFA_CANCEL;

    constructor() {
    }
}

/**
 * Distribuir Tarefas Cancel Success
 */
export class DistribuirTarefasCancelSuccess implements Action {
    readonly type = DISTRIBUIR_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa
 */
export class DeleteTarefa implements Action {
    readonly type = DELETE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa Success
 */
export class DeleteTarefaSuccess implements Action {
    readonly type = DELETE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa Failed
 */
export class DeleteTarefaFailed implements Action {
    readonly type = DELETE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Tarefa
 */
export class UndeleteTarefa implements Action {
    readonly type = UNDELETE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Tarefa Success
 */
export class UndeleteTarefaSuccess implements Action {
    readonly type = UNDELETE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Tarefa Failed
 */
export class UndeleteTarefaFailed implements Action {
    readonly type = UNDELETE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa Flush
 */
export class DeleteTarefaFlush implements Action {
    readonly type = DELETE_TAREFA_FLUSH;

    constructor() {
    }
}

/**
 * Delete Tarefa Cancel
 */
export class DeleteTarefaCancel implements Action {
    readonly type = DELETE_TAREFA_CANCEL;

    constructor() {
    }
}

/**
 * Delete Tarefa Cancel Success
 */
export class DeleteTarefaCancelSuccess implements Action {
    readonly type = DELETE_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa
 */
export class SaveTarefa implements Action {
    readonly type = SAVE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa Success
 */
export class SaveTarefaSuccess implements Action {
    readonly type = SAVE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa Failed
 */
export class SaveTarefaFailed implements Action {
    readonly type = SAVE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Save Etiqueta
 */
export class SaveEtiqueta implements Action {
    readonly type = SAVE_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Save Etiqueta Success
 */
export class SaveEtiquetaSuccess implements Action {
    readonly type = SAVE_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Etiqueta Failed
 */
export class SaveEtiquetaFailed implements Action {
    readonly type = SAVE_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida Tarefa
 */
export class ToggleLidaTarefa implements Action {
    readonly type = TOGGLE_LIDA_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida Tarefa Success
 */
export class ToggleLidaTarefaSuccess implements Action {
    readonly type = TOGGLE_LIDA_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Lida Tarefa Failed
 */
export class ToggleLidaTarefaFailed implements Action {
    readonly type = TOGGLE_LIDA_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Urgente Tarefa
 */
export class ToggleUrgenteTarefa implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Urgente Tarefa Success
 */
export class ToggleUrgenteTarefaSuccess implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Urgente Tarefa Failed
 */
export class ToggleUrgenteTarefaFailed implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta
 */
export class SaveConteudoVinculacaoEtiqueta implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Success
 */
export class SaveConteudoVinculacaoEtiquetaSuccess implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Failed
 */
export class SaveConteudoVinculacaoEtiquetaFailed implements Action
{
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Maximizado
 */
export class ToggleMaximizado implements Action {
    readonly type = TOGGLE_MAXIMIZADO;

    constructor(public payload: boolean = false) {
    }
}

/**
 * ISSUE-107
 */

/**
 * Get Assuntos dos processo da tarefa
 */
export class GetAssuntosProcessoTarefa implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos dos processo da tarefa Success
 */
export class GetAssuntosProcessoTarefaSuccess implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos dos processo da tarefa Failed
 */
export class GetAssuntosProcessoTarefaFailed implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}


/**
 * Seta o estado de carregando os assuntos do processo na tarefa
 */
export class SetLoadingAssuntos implements Action {
    readonly type = SET_LOADING_ASSUNTOS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os assuntos do processo na tarefa - sucesso
 */
export class SetLoadingAssuntosSuccess implements Action {
    readonly type = SET_LOADING_ASSUNTOS_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os assuntos do processo na tarefa - erro
 */
export class SetLoadingAssuntosFailed implements Action {
    readonly type = SET_LOADING_ASSUNTOS_FAILED;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa
 */
export class SetAssuntosLoaded implements Action {
    readonly type = SET_ASSUNTOS_LOADED;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa - sucesso
 */
export class SetAssuntosLoadedSuccess implements Action {
    readonly type = SET_ASSUNTOS_LOADED_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa - erro
 */
export class SetAssuntosLoadedFailed implements Action {
    readonly type = SET_ASSUNTOS_LOADED_FAILED;

    constructor() {
    }
}

/**
 * ISSUE-183
 */

/**
 * Get Interessados dos processo da tarefa
 */
export class GetInteressadosProcessoTarefa implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados dos processo da tarefa Success
 */
export class GetInteressadosProcessoTarefaSuccess implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados dos processo da tarefa Failed
 */
export class GetInteressadosProcessoTarefaFailed implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}


/**
 * Seta o estado de carregando os Interessados do processo na tarefa
 */
export class SetLoadingInteressados implements Action {
    readonly type = SET_LOADING_INTERESSADOS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os Interessados do processo na tarefa - sucesso
 */
export class SetLoadingInteressadosSuccess implements Action {
    readonly type = SET_LOADING_INTERESSADOS_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os Interessados do processo na tarefa - erro
 */
export class SetLoadingInteressadosFailed implements Action {
    readonly type = SET_LOADING_INTERESSADOS_FAILED;

    constructor() {
    }
}

/**
 * Seta o estado de Interessados carregados no processo da tarefa
 */
export class SetInteressadosLoaded implements Action {
    readonly type = SET_INTERESSADOS_LOADED;

    constructor() {
    }
}

/**
 * Seta o estado de Interessados carregados no processo da tarefa - sucesso
 */
export class SetInteressadosLoadedSuccess implements Action {
    readonly type = SET_INTERESSADOS_LOADED_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de Interessados carregados no processo da tarefa - erro
 */
export class SetInteressadosLoadedFailed implements Action {
    readonly type = SET_INTERESSADOS_LOADED_FAILED;

    constructor() {
    }
}

/**
 * Dar Ciencia Tarefa
 */
export class DarCienciaTarefa implements Action
{
    readonly type = DAR_CIENCIA_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Tarefa Success
 */
export class DarCienciaTarefaSuccess implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Tarefa Failed
 */
export class DarCienciaTarefaFailed implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Tarefa Cancel
 */
export class DarCienciaTarefaCancel implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_CANCEL;

    constructor()
    {
    }
}

/**
 * Dar Ciencia Tarefa Cancel Success
 */
export class DarCienciaTarefaCancelSuccess implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Dar Ciencia Tarefa Flush
 */
export class DarCienciaTarefaFlush implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_FLUSH;

    constructor()
    {
    }
}

/**
 * Redistribuir Tarefa
 */
export class RedistribuirTarefa implements Action
{
    readonly type = REDISTRIBUIR_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Redistribuir Tarefa Failed
 */
export class RedistribuirTarefaFailed implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Redistribuir Tarefa Success
 */
export class RedistribuirTarefaSuccess implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Redistribuir Tarefa Cancel
 */
export class RedistribuirTarefaCancel implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_CANCEL;

    constructor()
    {
    }
}

/**
 * Redistribuir Tarefa Cancel Success
 */
export class RedistribuirTarefaCancelSuccess implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Gerar Relatorio em Excel
 */
export class GerarRelatorioTarefaExcel implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL;

    constructor(public payload: any)
    {
    }
}

export class GerarRelatorioTarefaExcelFailed implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL_FAILED;

    constructor()
    {
    }
}

export class GerarRelatorioTarefaExcelSuccess implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Tarefa
 */
export class RemoveTarefa implements Action {
    readonly type = REMOVE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Save Observacao
 */
export class SaveObservacao implements Action
{
    readonly type = SAVE_OBSERVACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Observacao Success
 */
export class SaveObservacaoSuccess implements Action
{
    readonly type = SAVE_OBSERVACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Observacao Failed
 */
export class SaveObservacaoFailed implements Action
{
    readonly type = SAVE_OBSERVACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Upload Concluído
 */
export class UploadConcluido implements Action
{
    readonly type = UPLOAD_CONCLUIDO;

    constructor(public payload: any)
    {
    }
}

export class EditarObservacao implements Action
{
    readonly type = EDITAR_OBSERVACAO;

    constructor(public payload: any)
    {
    }
}

export class ChangeViewMode implements Action
{
    readonly type = CHANGE_VIEW_MODE;

    constructor(public payload: any)
    {
    }
}

export class GetAcoesEtiqueta implements Action {
    readonly type = GET_ACOES_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

export class GetAcoesEtiquetaSuccess implements Action {
    readonly type = GET_ACOES_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetAcoesEtiquetaFailed implements Action {
    readonly type = GET_ACOES_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export class AprovarSugestao implements Action {
    readonly type = APROVAR_SUGESTAO;

    constructor(public payload: any)
    {
    }
}

export class AprovarSugestaoSuccess implements Action {
    readonly type = APROVAR_SUGESTAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class AprovarSugestaoFailed implements Action {
    readonly type = APROVAR_SUGESTAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ReloadVinculacaoEtiqueta implements Action {
    readonly type = RELOAD_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

export class ToggleGroup implements Action {
    readonly type = TOGGLE_GROUP;

    constructor(public payload: any)
    {
    }
}

export class UnloadGroup implements Action {
    readonly type = UNLOAD_GROUP;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type TarefasActionsAll
    = UnloadTarefas
    | GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | GetTarefa
    | GetTarefaSuccess
    | GetTarefaFailed
    | GetEtiquetasTarefas
    | GetEtiquetasTarefasSuccess
    | GetEtiquetasTarefasFailed
    | GetWorkflowTarefa
    | GetWorkflowTarefaSuccess
    | GetWorkflowTarefaFailed
    | GetEtiquetaMinuta
    | GetEtiquetaMinutaSuccess
    | GetEtiquetaMinutaFailed
    | RemoveEtiquetaMinutaTarefa
    | RemoveEtiquetaOficioTarefa
    | AtualizaEtiquetaMinuta
    | CreateTarefa
    | CreateTarefaSuccess
    | SetCurrentTarefa
    | SetCurrentTarefaSuccess
    | SyncCurrentTarefaId
    | ChangeSelectedTarefas
    | ChangeDraggedTarefas
    | SetFolderOnSelectedTarefasStart
    | SetFolderOnSelectedTarefas
    | SetFolderOnSelectedTarefasSuccess
    | SetFolderOnSelectedTarefasFailed
    | SetFolderOnSelectedTarefasFinish
    | DistribuirTarefas
    | DistribuirTarefasSuccess
    | DistribuirTarefasFailed
    | DistribuirTarefasCancel
    | DistribuirTarefasFlush
    | DistribuirTarefasCancelSuccess
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | UndeleteTarefa
    | UndeleteTarefaSuccess
    | UndeleteTarefaFailed
    | DeleteTarefaFlush
    | DeleteTarefaCancel
    | DeleteTarefaCancelSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | SaveEtiqueta
    | SaveEtiquetaSuccess
    | SaveEtiquetaFailed
    | ToggleLidaTarefa
    | ToggleLidaTarefaSuccess
    | ToggleLidaTarefaFailed
    | ToggleUrgenteTarefa
    | ToggleUrgenteTarefaSuccess
    | ToggleUrgenteTarefaFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | ToggleMaximizado
    | GetAssuntosProcessoTarefa
    | GetAssuntosProcessoTarefaSuccess
    | GetAssuntosProcessoTarefaFailed
    | SetLoadingAssuntos
    | SetLoadingAssuntosSuccess
    | SetLoadingAssuntosFailed
    | SetAssuntosLoaded
    | SetAssuntosLoadedSuccess
    | SetAssuntosLoadedFailed
    | GetInteressadosProcessoTarefa
    | GetInteressadosProcessoTarefaSuccess
    | GetInteressadosProcessoTarefaFailed
    | SetLoadingInteressados
    | SetLoadingInteressadosSuccess
    | SetLoadingInteressadosFailed
    | SetInteressadosLoaded
    | SetInteressadosLoadedSuccess
    | SetInteressadosLoadedFailed
    | DarCienciaTarefa
    | DarCienciaTarefaSuccess
    | DarCienciaTarefaFailed
    | DarCienciaTarefaCancel
    | DarCienciaTarefaCancelSuccess
    | DarCienciaTarefaFlush
    | RedistribuirTarefa
    | RedistribuirTarefaFailed
    | RedistribuirTarefaSuccess
    | RedistribuirTarefaCancel
    | RedistribuirTarefaCancelSuccess
    | RemoveTarefa
    | GerarRelatorioTarefaExcel
    | GerarRelatorioTarefaExcelFailed
    | GerarRelatorioTarefaExcelSuccess
    | SaveObservacao
    | SaveObservacaoSuccess
    | SaveObservacaoFailed
    | UploadConcluido
    | EditarObservacao
    | ChangeViewMode
    | GetAcoesEtiqueta
    | GetAcoesEtiquetaSuccess
    | GetAcoesEtiquetaFailed
    | AprovarSugestao
    | AprovarSugestaoSuccess
    | AprovarSugestaoFailed
    | ReloadVinculacaoEtiqueta
    | ToggleGroup
    | UnloadGroup
    | ClearError;
