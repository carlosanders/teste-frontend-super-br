import {Action} from '@ngrx/store';

export const GET_TAREFA = '[TAREFA DETAIL] GET TAREFA';
export const GET_TAREFA_SUCCESS = '[TAREFA DETAIL] GET TAREFA SUCCESS';
export const GET_TAREFA_FAILED = '[TAREFA DETAIL] GET TAREFA FAILED';

export const EDIT_TAREFA = '[TAREFA DETAIL] EDIT TAREFA';
export const EDIT_TAREFA_SUCCESS = '[TAREFA DETAIL] EDIT TAREFA SUCCESS';

export const CREATE_TAREFA = '[TAREFA DETAIL] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFA DETAIL] CREATE TAREFA SUCCESS';

export const SAVE_TAREFA = '[TAREFA DETAIL] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA DETAIL] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA DETAIL] SAVE TAREFA FAILED';

export const REDISTRIBUIR_TAREFA = '[TAREFA DETAIL] REDISTRIBUIR TAREFA';
export const REDISTRIBUIR_TAREFA_SUCCESS = '[TAREFA DETAIL] REDISTRIBUIR TAREFA SUCCESS';
export const REDISTRIBUIR_TAREFA_FAILED = '[TAREFA DETAIL] REDISTRIBUIR TAREFA FAILED';

export const REDISTRIBUIR_TAREFA_CANCEL = '[TAREFA DETAIL] REDISTRIBUIR TAREFA CANCEL';
export const REDISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[TAREFA DETAIL] REDISTRIBUIR TAREFA CANCEL SUCCESS';
export const REDISTRIBUIR_TAREFA_FLUSH = '[TAREFA DETAIL] REDISTRIBUIR TAREFA FLUSH';

export const DAR_CIENCIA_TAREFA = '[TAREFA DETAIL] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[TAREFA DETAIL] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[TAREFA DETAIL] DAR CIENCIA TAREFA FAILED';

export const DAR_CIENCIA_TAREFA_CANCEL = '[TAREFA DETAIL] DAR CIENCIA TAREFA CANCEL';
export const DAR_CIENCIA_TAREFA_CANCEL_SUCCESS = '[TAREFA DETAIL] DAR CIENCIA TAREFA CANCEL SUCCESS';
export const DAR_CIENCIA_TAREFA_FLUSH = '[TAREFA DETAIL] DAR CIENCIA TAREFA FLUSH';

export const DELETE_TAREFA = '[TAREFA DETAIL] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFA DETAIL] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFA DETAIL] DELETE TAREFA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[TAREFA DETAIL] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA DETAIL] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA DETAIL] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[TAREFA DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[TAREFA DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[TAREFA DETAIL] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA DETAIL] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA DETAIL] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[TAREFA DETAIL] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[TAREFA DETAIL] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[TAREFA DETAIL] GET DOCUMENTOS FAILED';

export const DESELECT_TAREFA_ACTION = '[TAREFA DETAIL] DESELECT TAREFA ACTION';

export const ADD_PLUGIN_LOADING = '[TAREFA DETAIL] ADD PLUGIN LOADING';
export const REMOVE_PLUGIN_LOADING = '[TAREFA DETAIL] REMOVE PLUGIN LOADING';

export const TAREFA_PROCESO_RESTRITO_VALIDADA_SUCCESS = '[TAREFA DETAIL] TAREFA PROCESSO RESTRITO VALIDADA SUCCESS';

export const UPLOAD_CONCLUIDO = '[TAREFA DETAIL] UPLOAD CONCLUIDO';

export const GET_ETIQUETAS_TAREFAS = '[TAREFA DETAIL] GET ETIQUETAS TAREFA';
export const GET_ETIQUETAS_TAREFAS_SUCCESS = '[TAREFA DETAIL] GET ETIQUETAS TAREFA SUCCESS';
export const GET_ETIQUETAS_TAREFAS_FAILED = '[TAREFA DETAIL] GET ETIQUETAS TAREFA FAILED';

export const REMOVE_ETIQUETA_MINUTA_TAREFA = '[TAREFA DETAIL] REMOVE ETIQUETA MINUTA TAREFA';
export const REMOVE_ETIQUETA_OFICIO_TAREFA = '[TAREFA DETAIL] REMOVE ETIQUETA OFICIO TAREFA';
export const ATUALIZA_ETIQUETA_MINUTA = '[TAREFA DETAIL] ATUALIZA ETIQUETA MINUTA';

export const TOGGLE_SHOW_DETAIL = '[TAREFA DETAIL] TOOGLE SHOW DETAIL';

export const APROVAR_SUGESTAO = '[TAREFA DETAIL] APROVAR SUGESTAO';
export const APROVAR_SUGESTAO_SUCCESS = '[TAREFA DETAIL] APROVAR SUGESTAO SUCCESS';
export const APROVAR_SUGESTAO_FAILED = '[TAREFA DETAIL] APROVAR SUGESTAO FAILED';
export const RELOAD_VINCULACAO_ETIQUETA = '[TAREFA DETAIL] RELOAD VINCULACAO_ETIQUETA';

export const CLEAR_ERROR = '[TAREFA DETAIL] CLEAR ERROR';
export const UNLOAD_TAREFA_DETAIL = '[TAREFA DETAIL] UNLOAD TAREFA DETAIL';

/**
 * Get Tarefa
 */
export class GetTarefa implements Action
{
    readonly type = GET_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Success
 */
export class GetTarefaSuccess implements Action
{
    readonly type = GET_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Failed
 */
export class GetTarefaFailed implements Action
{
    readonly type = GET_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Tarefa
 */
export class EditTarefa implements Action
{
    readonly type = EDIT_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Tarefa Success
 */
export class EditTarefaSuccess implements Action
{
    readonly type = EDIT_TAREFA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Tarefa
 */
export class SaveTarefa implements Action
{
    readonly type = SAVE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Tarefa Success
 */
export class SaveTarefaSuccess implements Action
{
    readonly type = SAVE_TAREFA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Tarefa Failed
 */
export class SaveTarefaFailed implements Action
{
    readonly type = SAVE_TAREFA_FAILED;

    constructor(public payload: any)
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
 * Redistribuir Tarefa Flush
 */
export class RedistribuirTarefaFlush implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_FLUSH;

    constructor()
    {
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
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
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
 * Delete Tarefa
 */
export class DeleteTarefa implements Action
{
    readonly type = DELETE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Success
 */
export class DeleteTarefaSuccess implements Action
{
    readonly type = DELETE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Failed
 */
export class DeleteTarefaFailed implements Action
{
    readonly type = DELETE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Tarefa
 */
export class CreateTarefa implements Action
{
    readonly type = CREATE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Creat Tarefa Success
 */
export class CreateTarefaSuccess implements Action
{
    readonly type = CREATE_TAREFA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Deselect Tarefa Action
 */
export class DeselectTarefaAction implements Action
{
    readonly type = DESELECT_TAREFA_ACTION;

    constructor()
    {
    }
}

/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Failed
 */
export class GetDocumentosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Add Plugin Loading
 */
export class AddPluginLoading implements Action
{
    readonly type = ADD_PLUGIN_LOADING;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Plugin Loading
 */
export class RemovePluginLoading implements Action
{
    readonly type = REMOVE_PLUGIN_LOADING;

    constructor(public payload: any)
    {
    }
}

export class TarefaProcessoRestritoValidadaSuccess implements Action
{
    readonly type = TAREFA_PROCESO_RESTRITO_VALIDADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class UploadConcluido implements Action
{
    readonly type = UPLOAD_CONCLUIDO;

    constructor(public payload: any)
    {
    }
}

export class GetEtiquetasTarefas implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS;

    constructor(public payload: any) {
    }
}

export class GetEtiquetasTarefasSuccess implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetEtiquetasTarefasFailed implements Action {
    readonly type = GET_ETIQUETAS_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

export class RemoveEtiquetaMinutaTarefa implements Action {
    readonly type = REMOVE_ETIQUETA_MINUTA_TAREFA;

    constructor(public payload: any)
    {
    }
}

export class RemoveEtiquetaOficioTarefa implements Action {
    readonly type = REMOVE_ETIQUETA_OFICIO_TAREFA;

    constructor(public payload: any)
    {
    }
}

export class AtualizaEtiquetaMinuta implements Action {
    readonly type = ATUALIZA_ETIQUETA_MINUTA;

    constructor(public payload: any)
    {
    }
}

export class ToggleShowDetail implements Action {
    readonly type = TOGGLE_SHOW_DETAIL;

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

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class UnloadTarefaDetail implements Action {
    readonly type = UNLOAD_TAREFA_DETAIL;
}

export type TarefaDetailActionsAll
    = GetTarefa
    | GetTarefaSuccess
    | GetTarefaFailed
    | CreateTarefa
    | CreateTarefaSuccess
    | EditTarefa
    | EditTarefaSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | RedistribuirTarefa
    | RedistribuirTarefaSuccess
    | RedistribuirTarefaFailed
    | RedistribuirTarefaCancel
    | RedistribuirTarefaCancelSuccess
    | RedistribuirTarefaFlush
    | DarCienciaTarefa
    | DarCienciaTarefaSuccess
    | DarCienciaTarefaFailed
    | DarCienciaTarefaCancel
    | DarCienciaTarefaCancelSuccess
    | DarCienciaTarefaFlush
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaSuccess
    | SaveConteudoVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DeselectTarefaAction
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | AddPluginLoading
    | RemovePluginLoading
    | TarefaProcessoRestritoValidadaSuccess
    | UploadConcluido
    | GetEtiquetasTarefas
    | GetEtiquetasTarefasSuccess
    | GetEtiquetasTarefasFailed
    | RemoveEtiquetaMinutaTarefa
    | RemoveEtiquetaOficioTarefa
    | AtualizaEtiquetaMinuta
    | ToggleShowDetail
    | AprovarSugestao
    | AprovarSugestaoSuccess
    | AprovarSugestaoFailed
    | ReloadVinculacaoEtiqueta
    | ClearError
    | UnloadTarefaDetail;
