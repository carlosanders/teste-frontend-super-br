import {Action} from '@ngrx/store';

export const UNDELETE_DOCUMENTO = '[RESTAURAR] UNDELETE DOCUMENTO';
export const UNDELETE_DOCUMENTO_SUCCESS = '[RESTAURAR] UNDELETE DOCUMENTO SUCCESS';
export const UNDELETE_DOCUMENTO_FAILED = '[RESTAURAR] UNDELETE DOCUMENTO FAILED';

/**
 * Undelete Documento
 */
export class UndeleteDocumento implements Action
{
    readonly type = UNDELETE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Undelete Documento Success
 */
export class UndeleteDocumentoSuccess implements Action
{
    readonly type = UNDELETE_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Documento Failed
 */
export class UndeleteDocumentoFailed implements Action
{
    readonly type = UNDELETE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type DocumentoEditActionsAll
    = UndeleteDocumento
    | UndeleteDocumentoSuccess
    | UndeleteDocumentoFailed;
