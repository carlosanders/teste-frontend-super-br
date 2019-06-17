import { Action } from '@ngrx/store';

export const CREATE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO CREATE] CREATE DOCUMENTO AVULSO';
export const CREATE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO CREATE] CREATE DOCUMENTO AVULSO SUCCESS';

export const SAVE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO CREATE] SAVE DOCUMENTO AVULSO';
export const SAVE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO CREATE] SAVE DOCUMENTO AVULSO SUCCESS';
export const SAVE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO CREATE] SAVE DOCUMENTO AVULSO FAILED';

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

    constructor()
    {
    }
}

export type DocumentoAvulsoCreateActionsAll
    = CreateDocumentoAvulso
    | CreateDocumentoAvulsoSuccess
    | SaveDocumentoAvulso
    | SaveDocumentoAvulsoSuccess
    | SaveDocumentoAvulsoFailed;
