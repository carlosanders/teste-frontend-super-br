import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] CHANGE SELECTED DOCUMENTOS';

export const UNLOAD_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] UNLOAD DOCUMENTOS';

export const UPDATE_DOCUMENTO = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[ATIVIDADE DOCUMENTO] UPDATE DOCUMENTO FAILED';

export const REMOVE_MINUTAS_TAREFA = '[ATIVIDADE DOCUMENTO] REMOVE MINUTAS TAREFA';

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

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos
 */
export class ChangeSelectedDocumentos implements Action
{
    readonly type = CHANGE_SELECTED_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Documentos
 */
export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS;

    constructor()
    {
    }
}

/**
 * Remove Minutas Tarefa
 */
export class RemoveMinutasTarefa implements Action
{
    readonly type = REMOVE_MINUTAS_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento
 */
export class UpdateDocumento implements Action
{
    readonly type = UPDATE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Success
 */
export class UpdateDocumentoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Failed
 */
export class UpdateDocumentoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type DocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ChangeSelectedDocumentos
    | UnloadDocumentos
    | RemoveMinutasTarefa
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed;
