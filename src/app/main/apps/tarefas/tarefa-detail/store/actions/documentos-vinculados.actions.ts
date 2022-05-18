import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[TAREFA DETAIL] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[TAREFA DETAIL] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[TAREFA DETAIL] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[TAREFA DETAIL] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[TAREFA DETAIL] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[TAREFA DETAIL] DELETE DOCUMENTO VINCULADO FAILED';

export const COMPLETE_DOCUMENTO_VINCULADO = '[TAREFA DETAIL] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[TAREFA DETAIL] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const UPDATE_DOCUMENTO_VINCULADO = '[TAREFA DETAIL] UPDATE DOCUMENTO VINCULADO';
export const UPDATE_DOCUMENTO_VINCULADO_SUCCESS = '[TAREFA DETAIL] UPDATE DOCUMENTO VINCULADO SUCCESS';
export const UPDATE_DOCUMENTO_VINCULADO_FAILED = '[TAREFA DETAIL] UPDATE DOCUMENTO VINCULADO FAILED';

export const SET_SAVING = '[TAREFA DETAIL] SET SAVING COMPONENTES DIGITAIS';
export const UNLOAD_DOCUMENTOS_VINCULADOS = '[TAREFA DETAIL] UNLOAD DOCUMENTOS VINCULADOS';

/**
 * Get Documentos Vinculados
 */
export class GetDocumentosVinculados implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Success
 */
export class GetDocumentosVinculadosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Failed
 */
export class GetDocumentosVinculadosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Delete Documento Vinculado
 */
export class DeleteDocumentoVinculado implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Success
 */
export class DeleteDocumentoVinculadoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Failed
 */
export class DeleteDocumentoVinculadoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos Vinculados
 */
export class ChangeSelectedDocumentosVinculados implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any) {
    }
}

/**
 * Complete Documento Vinculado
 */
export class CompleteDocumentoVinculado implements Action
{
    readonly type = COMPLETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update DocumentoVinculado
 */
export class UpdateDocumentoVinculado implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update DocumentoVinculado Success
 */
export class UpdateDocumentoVinculadoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoVinculado Failed
 */
export class UpdateDocumentoVinculadoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetSavingComponentesDigitais implements Action
{
    readonly type = SET_SAVING;

    constructor()
    {
    }
}

export class UnloadDocumentosVinculados implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

export type DocumentosVinculadosActionsAll
    = GetDocumentosVinculados
    | GetDocumentosVinculadosSuccess
    | GetDocumentosVinculadosFailed
    | CompleteDocumentoVinculado
    | DeleteDocumentoVinculado
    | DeleteDocumentoVinculadoSuccess
    | DeleteDocumentoVinculadoFailed
    | ChangeSelectedDocumentosVinculados
    | UpdateDocumentoVinculado
    | UpdateDocumentoVinculadoSuccess
    | UpdateDocumentoVinculadoFailed
    | SetSavingComponentesDigitais
    | UnloadDocumentosVinculados;
