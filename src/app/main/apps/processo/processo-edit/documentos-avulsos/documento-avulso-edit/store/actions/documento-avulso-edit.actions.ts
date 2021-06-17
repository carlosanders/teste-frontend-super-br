import {Action} from '@ngrx/store';

export const CREATE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] CREATE DOCUMENTO AVULSO';
export const CREATE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] CREATE DOCUMENTO AVULSO SUCCESS';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO] SAVE DOCUMENTO AVULSO FAILED';

export const GET_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO] GET DOCUMENTO AVULSO';
export const GET_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO] GET DOCUMENTO AVULSO SUCCESS';
export const GET_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO] GET DOCUMENTO AVULSO FAILED';

/**
 * Get DocumentoAvulso
 */
export class GetDocumentoAvulso implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Success
 */
export class GetDocumentoAvulsoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Failed
 */
export class GetDocumentoAvulsoFailed implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: string)
    {
    }
}

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

    constructor()
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

    constructor()
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

export type DocumentoAvulsoEditActionsAll
    = CreateDocumentoAvulso
    | CreateDocumentoAvulsoSuccess
    | GetDocumentoAvulso
    | GetDocumentoAvulsoSuccess
    | GetDocumentoAvulsoFailed
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed;
