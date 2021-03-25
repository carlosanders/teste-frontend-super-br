import {Action} from '@ngrx/store';

export const UNLOAD_TAREFAS = '[TAREFAS] UNLOAD TAREFAS';

export const GET_TAREFAS = '[TAREFAS] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[TAREFAS] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[TAREFAS] GET TAREFAS FAILED';

export const SET_CURRENT_TAREFA = '[TAREFAS] SET CURRENT TAREFA';
export const SET_CURRENT_TAREFA_SUCCESS = '[TAREFAS] SET CURRENT TAREFA SUCCESS';

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

export const REMOVE_TAREFA = '[TAREFAS] REMOVE TAREFA';

export const TOGGLE_MAXIMIZADO = '[TAREFAS] TOGGLE MAXIMIZADO';

export const TOGGLE_LIDA_TAREFA = '[TAREFAS] TOGGLE LIDA TAREFA';
export const TOGGLE_LIDA_TAREFA_SUCCESS = '[TAREFAS] TOGGLE LIDA TAREFA SUCCESS';
export const TOGGLE_LIDA_TAREFA_FAILED = '[TAREFAS] TOGGLE LIDA TAREFA FAILED';

export const TOGGLE_URGENTE_TAREFA = '[TAREFAS] TOGGLE URGENTE TAREFA';
export const TOGGLE_URGENTE_TAREFA_SUCCESS = '[TAREFAS] TOGGLE URGENTE TAREFA SUCCESS';
export const TOGGLE_URGENTE_TAREFA_FAILED = '[TAREFAS] TOGGLE URGENTE TAREFA FAILED';

export const SET_FOLDER_ON_SELECTED_TAREFAS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS SUCCESS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_FAILED = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS FAILED';

export const SET_SETOR_ON_SELECTED_TAREFAS = '[TAREFAS] SET SETOR ON SELECTED TAREFAS';
export const SET_SETOR_ON_SELECTED_TAREFAS_SUCCESS = '[TAREFAS] SET SETOR ON SELECTED TAREFAS SUCCESS';
export const SET_SETOR_ON_SELECTED_TAREFAS_FAILED = '[TAREFAS] SET SETOR ON SELECTED TAREFAS FAILED';

export const SAVE_TAREFA = '[TAREFA] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA] SAVE TAREFA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[TAREFA] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] CREATE VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[TAREFA] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_ASSUNTOS_PROCESSO_TAREFA = '[TAREFA] GET ASSUNTOS PROCESSO';
export const GET_ASSUNTOS_PROCESSO_TAREFA_SUCCESS = '[TAREFA] GET ASSUNTOS PROCESSO SUCCESS';
export const GET_ASSUNTOS_PROCESSO_TAREFA_FAILED = '[TAREFA] GET ASSUNTOS PROCESSO FAILED';

export const SET_LOADING_ASSUNTOS = '[TAREFA] SET LOADING ASSUNTOS';
export const SET_LOADING_ASSUNTOS_SUCCESS = '[TAREFA] SET LOADING ASSUNTOS SUCCESS';
export const SET_LOADING_ASSUNTOS_FAILED = '[TAREFA] SET LOADING ASSUNTOS FAILED';

export const SET_ASSUNTOS_LOADED = '[TAREFA] SET ASSUNTOS LOADED';
export const SET_ASSUNTOS_LOADED_SUCCESS = '[TAREFA] SET ASSUNTOS LOADED SUCCESS';
export const SET_ASSUNTOS_LOADED_FAILED = '[TAREFA] SET ASSUNTOS LOADED FAILED';

export const DAR_CIENCIA_TAREFA = '[TAREFA] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[TAREFA] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[TAREFA] DAR CIENCIA TAREFA FAILED';

export const DAR_CIENCIA_TAREFA_CANCEL = '[TAREFA] DAR CIENCIA TAREFA CANCEL';
export const DAR_CIENCIA_TAREFA_CANCEL_SUCCESS = '[TAREFA] DAR CIENCIA TAREFA CANCEL SUCCESS';
export const DAR_CIENCIA_TAREFA_FLUSH = '[TAREFA] DAR CIENCIA TAREFA FLUSH';

export const REDISTRIBUIR_TAREFA = '[TAREFAS] REDISTRIBUIR TAREFA';
export const REDISTRIBUIR_TAREFA_FAILED = '[TAREFAS] REDISTRIBUIR TAREFA FAILED';
export const REDISTRIBUIR_TAREFA_SUCCESS = '[TAREFAS] REDISTRIBUIR TAREFA SUCCESS';

export const REDISTRIBUIR_TAREFA_CANCEL = '[TAREFAS] REDISTRIBUIR TAREFA CANCEL';
export const REDISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[TAREFAS] REDISTRIBUIR TAREFA CANCEL SUCCESS';



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
 * Set Setor on Selected Tarefas
 */
export class SetSetorOnSelectedTarefas implements Action {
    readonly type = SET_SETOR_ON_SELECTED_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Set setor on Selected Tarefas Success
 */
export class SetSetorOnSelectedTarefasSuccess implements Action {
    readonly type = SET_SETOR_ON_SELECTED_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Setor on Selected Tarefas Failed
 */
export class SetSetorOnSelectedTarefasFailed implements Action {
    readonly type = SET_SETOR_ON_SELECTED_TAREFAS_FAILED;

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
 * Remove Tarefa
 */
export class RemoveTarefa implements Action {
    readonly type = REMOVE_TAREFA;

    constructor(public payload: any) {
    }
}

export type TarefasActionsAll
    = UnloadTarefas
    | GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | CreateTarefa
    | CreateTarefaSuccess
    | SetCurrentTarefa
    | SetCurrentTarefaSuccess
    | ChangeSelectedTarefas
    | SetFolderOnSelectedTarefas
    | SetFolderOnSelectedTarefasSuccess
    | SetFolderOnSelectedTarefasFailed
    | SetSetorOnSelectedTarefas
    | SetSetorOnSelectedTarefasSuccess
    | SetSetorOnSelectedTarefasFailed
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
    | RemoveTarefa;
