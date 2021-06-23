import {Action} from '@ngrx/store';

export const CREATE_NUMERO_UNICO_DOCUMENTO = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] CREATE NUMERO UNICO DOCUMENTO';
export const CREATE_NUMERO_UNICO_DOCUMENTO_SUCCESS = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] CREATE NUMERO UNICO DOCUMENTO SUCCESS';

export const SAVE_NUMERO_UNICO_DOCUMENTO = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] SAVE NUMERO UNICO DOCUMENTO';
export const SAVE_NUMERO_UNICO_DOCUMENTO_SUCCESS = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] SAVE NUMERO UNICO DOCUMENTO SUCCESS';
export const SAVE_NUMERO_UNICO_DOCUMENTO_FAILED = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] SAVE NUMERO UNICO DOCUMENTO FAILED';

export const GET_NUMERO_UNICO_DOCUMENTO = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] GET NUMERO UNICO DOCUMENTO';
export const GET_NUMERO_UNICO_DOCUMENTO_SUCCESS = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] GET NUMERO UNICO DOCUMENTO SUCCESS';
export const GET_NUMERO_UNICO_DOCUMENTO_FAILED = '[COORDENADOR NUMERO UNICO DOCUMENTO EDIT] GET NUMERO UNICO DOCUMENTO FAILED';

/**
 * Get NumeroUnicoDocumento
 */
export class GetNumeroUnicoDocumento implements Action
{
    readonly type = GET_NUMERO_UNICO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get NumeroUnicoDocumento Success
 */
export class GetNumeroUnicoDocumentoSuccess implements Action
{
    readonly type = GET_NUMERO_UNICO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get NumeroUnicoDocumento Failed
 */
export class GetNumeroUnicoDocumentoFailed implements Action
{
    readonly type = GET_NUMERO_UNICO_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save NumeroUnicoDocumento
 */
export class SaveNumeroUnicoDocumento implements Action
{
    readonly type = SAVE_NUMERO_UNICO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save NumeroUnicoDocumento Success
 */
export class SaveNumeroUnicoDocumentoSuccess implements Action
{
    readonly type = SAVE_NUMERO_UNICO_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save NumeroUnicoDocumento Failed
 */
export class SaveNumeroUnicoDocumentoFailed implements Action
{
    readonly type = SAVE_NUMERO_UNICO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create NumeroUnicoDocumento
 */
export class CreateNumeroUnicoDocumento implements Action
{
    readonly type = CREATE_NUMERO_UNICO_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Create NumeroUnicoDocumento Success
 */
export class CreateNumeroUnicoDocumentoSuccess implements Action
{
    readonly type = CREATE_NUMERO_UNICO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type NumeroUnicoDocumentoEditActionsAll
    = CreateNumeroUnicoDocumento
    | CreateNumeroUnicoDocumentoSuccess
    | GetNumeroUnicoDocumento
    | GetNumeroUnicoDocumentoSuccess
    | GetNumeroUnicoDocumentoFailed
    | SaveNumeroUnicoDocumento
    | SaveNumeroUnicoDocumentoSuccess
    | SaveNumeroUnicoDocumentoFailed;
