import {Action} from '@ngrx/store';

export const CREATE_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR] CREATE DOCUMENTO IDENTIFICADOR';
export const CREATE_DOCUMENTO_IDENTIFICADOR_SUCCESS = '[DOCUMENTO IDENTIFICADOR] CREATE DOCUMENTO IDENTIFICADOR SUCCESS';

export const SAVE_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR] SAVE DOCUMENTO IDENTIFICADOR';
export const SAVE_DOCUMENTO_IDENTIFICADOR_SUCCESS = '[DOCUMENTO IDENTIFICADOR] SAVE DOCUMENTO IDENTIFICADOR SUCCESS';
export const SAVE_DOCUMENTO_IDENTIFICADOR_FAILED = '[DOCUMENTO IDENTIFICADOR] SAVE DOCUMENTO IDENTIFICADOR FAILED';

export const GET_DOCUMENTO_IDENTIFICADOR = '[DOCUMENTO IDENTIFICADOR] GET DOCUMENTO IDENTIFICADOR';
export const GET_DOCUMENTO_IDENTIFICADOR_SUCCESS = '[DOCUMENTO IDENTIFICADOR] GET DOCUMENTO IDENTIFICADOR SUCCESS';
export const GET_DOCUMENTO_IDENTIFICADOR_FAILED = '[DOCUMENTO IDENTIFICADOR] GET DOCUMENTO IDENTIFICADOR FAILED';

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
export class GetDocumentoIdentificadoruccess implements Action
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
 * Save DocumentoIdentificador
 */
export class SaveDocumentoIdentificador implements Action
{
    readonly type = SAVE_DOCUMENTO_IDENTIFICADOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoIdentificador Success
 */
export class SaveDocumentoIdentificadoruccess implements Action
{
    readonly type = SAVE_DOCUMENTO_IDENTIFICADOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save DocumentoIdentificador Failed
 */
export class SaveDocumentoIdentificadorFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_IDENTIFICADOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DocumentoIdentificador
 */
export class CreateDocumentoIdentificador implements Action
{
    readonly type = CREATE_DOCUMENTO_IDENTIFICADOR;

    constructor()
    {
    }
}

/**
 * Create DocumentoIdentificador Success
 */
export class CreateDocumentoIdentificadoruccess implements Action
{
    readonly type = CREATE_DOCUMENTO_IDENTIFICADOR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type DocumentoIdentificadorEditActionsAll
    = CreateDocumentoIdentificador
    | CreateDocumentoIdentificadoruccess
    | GetDocumentoIdentificador
    | GetDocumentoIdentificadoruccess
    | GetDocumentoIdentificadorFailed
    | SaveDocumentoIdentificador
    | SaveDocumentoIdentificadoruccess
    | SaveDocumentoIdentificadorFailed;
