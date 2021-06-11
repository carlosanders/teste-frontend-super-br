import {Action} from '@ngrx/store';

export const GET_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR LIST] GET DOCUMENTO IDENTIFICADOR';
export const GET_DOCUMENTO_IDENTIFICADOR_SUCCESS = '[DOCUMENTO IDENTIFICADOR LIST] GET DOCUMENTO IDENTIFICADOR SUCCESS';
export const GET_DOCUMENTO_IDENTIFICADOR_FAILED = '[DOCUMENTO IDENTIFICADOR LIST] GET DOCUMENTO IDENTIFICADOR FAILED';

export const RELOAD_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR LIST] RELOAD DOCUMENTO IDENTIFICADOR';

export const DELETE_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR LIST] DELETE DOCUMENTO IDENTIFICADOR';
export const DELETE_DOCUMENTO_IDENTIFICADOR_SUCCESS = '[DOCUMENTO IDENTIFICADOR LIST] DELETE DOCUMENTO IDENTIFICADOR SUCCESS';
export const DELETE_DOCUMENTO_IDENTIFICADOR_FAILED = '[DOCUMENTO IDENTIFICADOR LIST] DELETE DOCUMENTO IDENTIFICADOR FAILED';

/**
 * Get DocumentoIdentificador
 */
export class GetDocumentoIdentificador implements Action
{
    readonly type = GET_DOCUMENTO_IDENTIFICADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoIdentificador Success
 */
export class GetDocumentoIdentificadorSuccess implements Action
{
    readonly type = GET_DOCUMENTO_IDENTIFICADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoIdentificador Failed
 */
export class GetDocumentoIdentificadorFailed implements Action
{
    readonly type = GET_DOCUMENTO_IDENTIFICADOR_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload DocumentoIdentificador
 */
export class ReloadDocumentoIdentificador implements Action
{
    readonly type = RELOAD_DOCUMENTO_IDENTIFICADOR;

    constructor()
    {
    }
}

/**
 * Delete DocumentoIdentificador
 */
export class DeleteDocumentoIdentificador implements Action
{
    readonly type = DELETE_DOCUMENTO_IDENTIFICADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete DocumentoIdentificador Success
 */
export class DeleteDocumentoIdentificadorSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_IDENTIFICADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete DocumentoIdentificador Failed
 */
export class DeleteDocumentoIdentificadorFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_IDENTIFICADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

export type DocumentoIdentificadorListActionsAll
    = GetDocumentoIdentificador
    | GetDocumentoIdentificadorSuccess
    | GetDocumentoIdentificadorFailed
    | ReloadDocumentoIdentificador
    | DeleteDocumentoIdentificador
    | DeleteDocumentoIdentificadorSuccess
    | DeleteDocumentoIdentificadorFailed;

