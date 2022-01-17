import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[TAREFAS] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[TAREFAS] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[TAREFAS] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[TAREFAS] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[TAREFAS] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[TAREFAS] DELETE DOCUMENTO VINCULADO FAILED';

export const COMPLETE_DOCUMENTO_VINCULADO = '[TAREFAS] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[TAREFAS] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const UPDATE_DOCUMENTO_VINCULADO = '[TAREFAS] UPDATE DOCUMENTO VINCULADO';
export const UPDATE_DOCUMENTO_VINCULADO_SUCCESS = '[TAREFAS] UPDATE DOCUMENTO VINCULADO SUCCESS';
export const UPDATE_DOCUMENTO_VINCULADO_FAILED = '[TAREFAS] UPDATE DOCUMENTO VINCULADO FAILED';

export const SET_SAVING = '[TAREFAS] SET SAVING COMPONENTES DIGITAIS';
export const UNLOAD_DOCUMENTOS_VINCULADOS = '[TAREFAS] UNLOAD DOCUMENTOS VINCULADOS';

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
