import {Action} from '@ngrx/store';

export const CREATE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] CREATE DOCUMENTO AVULSO';
export const CREATE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] CREATE DOCUMENTO AVULSO SUCCESS';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO FAILED';

export const GET_DOCUMENTO = '[DOCUMENTO AVULSO] GET DOCUMENTO';
export const GET_DOCUMENTO_SUCCESS = '[DOCUMENTO AVULSO] GET DOCUMENTO SUCCESS';
export const GET_DOCUMENTO_FAILED = '[DOCUMENTO AVULSO] GET DOCUMENTO FAILED';

/**
 * Save DocumentoAvulso
 */
export class SaveDocumentoAvulso implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Success
 */
export class SaveDocumentoAvulsoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoAvulso Failed
 */
export class SaveDocumentoAvulsoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DocumentoAvulso
 */
export class CreateDocumentoAvulso implements Action
{
    readonly type = CREATE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create DocumentoAvulso Success
 */
export class CreateDocumentoAvulsoSuccess implements Action
{
    readonly type = CREATE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento
 */
export class GetDocumento implements Action
{
    readonly type = GET_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Success
 */
export class GetDocumentoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documento Failed
 */
export class GetDocumentoFailed implements Action
{
    readonly type = GET_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

export type DocumentoAvulsoCreateActionsAll
    = CreateDocumentoAvulso
    | CreateDocumentoAvulsoSuccess
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed
    | GetDocumento
    | GetDocumentoSuccess
    | GetDocumentoFailed;
