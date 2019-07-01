import { Action } from '@ngrx/store';

export const GET_TAREFA = '[TAREFA] GET TAREFA';
export const GET_TAREFA_SUCCESS = '[TAREFA] GET TAREFA SUCCESS';
export const GET_TAREFA_FAILED = '[TAREFA] GET TAREFA FAILED';

export const EDIT_TAREFA = '[TAREFA] EDIT TAREFA';
export const EDIT_TAREFA_SUCCESS = '[TAREFA] EDIT TAREFA SUCCESS';

export const CREATE_TAREFA = '[TAREFA] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFA] CREATE TAREFA SUCCESS';

export const SAVE_TAREFA = '[TAREFA] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA] SAVE TAREFA FAILED';

export const DAR_CIENCIA_TAREFA = '[TAREFA] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[TAREFA] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[TAREFA] DAR CIENCIA TAREFA FAILED';

export const DELETE_TAREFA = '[TAREFA] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFA] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFA] DELETE TAREFA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[TAREFA] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[TAREFA] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_DOCUMENTOS = '[TAREFA] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[TAREFA] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[TAREFA] GET DOCUMENTOS FAILED';

export const DESELECT_TAREFA_ACTION = '[TAREFA] DESELECT TAREFA ACTION';

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
    | DarCienciaTarefa
    | DarCienciaTarefaSuccess
    | DarCienciaTarefaFailed
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | DeselectTarefaAction
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed;
