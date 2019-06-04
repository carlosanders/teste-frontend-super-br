import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[DOCUMENTO LIST] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[DOCUMENTO LIST] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[DOCUMENTO LIST] GET DOCUMENTOS FAILED';

export const RELOAD_DOCUMENTOS = '[DOCUMENTO LIST] RELOAD DOCUMENTOS';

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
 * Reload Documentos
 */
export class ReloadDocumentos implements Action
{
    readonly type = RELOAD_DOCUMENTOS;

    constructor()
    {
    }
}

export type DocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ReloadDocumentos;

