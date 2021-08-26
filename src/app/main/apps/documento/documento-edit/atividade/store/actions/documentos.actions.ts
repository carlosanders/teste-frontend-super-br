import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[ATIVIDADE DOCUMENTO] GET DOCUMENTOS FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] CHANGE SELECTED DOCUMENTOS';

export const UNLOAD_DOCUMENTOS = '[ATIVIDADE DOCUMENTO] UNLOAD DOCUMENTOS';

/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS;

    constructor()
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

export type DocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ChangeSelectedDocumentos
    | UnloadDocumentos;
