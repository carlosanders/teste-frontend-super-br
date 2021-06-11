import {Action} from '@ngrx/store';

export const SAVE_DOCUMENTO = '[DOCUMENTO EDIT] SAVE DOCUMENTO';
export const SAVE_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT] SAVE DOCUMENTO SUCCESS';
export const SAVE_DOCUMENTO_FAILED = '[DOCUMENTO EDIT] SAVE DOCUMENTO FAILED';

/**
 * Save Documento
 */
export class SaveDocumento implements Action
{
    readonly type = SAVE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Success
 */
export class SaveDocumentoSuccess implements Action
{
    readonly type = SAVE_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Documento Failed
 */
export class SaveDocumentoFailed implements Action
{
    readonly type = SAVE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type DocumentoEditActionsAll
    = SaveDocumento
    | SaveDocumentoSuccess
    | SaveDocumentoFailed;
