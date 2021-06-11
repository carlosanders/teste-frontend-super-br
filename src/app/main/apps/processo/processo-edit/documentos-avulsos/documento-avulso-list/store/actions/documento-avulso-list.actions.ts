import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_AVULSOS = '[DOCUMENTO AVULSO LIST] GET DOCUMENTOS AVULSOS';
export const GET_DOCUMENTOS_AVULSOS_SUCCESS = '[DOCUMENTO AVULSO LIST] GET DOCUMENTOS AVULSOS SUCCESS';
export const GET_DOCUMENTOS_AVULSOS_FAILED = '[DOCUMENTO AVULSO LIST] GET DOCUMENTOS AVULSOS FAILED';

export const RELOAD_DOCUMENTOS_AVULSOS = '[DOCUMENTO AVULSO LIST] RELOAD DOCUMENTOS AVULSOS';

export const RESPONDER_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO LIST] RESPONDER DOCUMENTO AVULSO';

export const DELETE_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO LIST] DELETE DOCUMENTO AVULSO';
export const DELETE_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO LIST] DELETE DOCUMENTO AVULSO SUCCESS';
export const DELETE_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO LIST] DELETE DOCUMENTO AVULSO FAILED';

/**
 * Get DocumentosAvulsos
 */
export class GetDocumentosAvulsos implements Action
{
    readonly type = GET_DOCUMENTOS_AVULSOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentosAvulsos Success
 */
export class GetDocumentosAvulsosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_AVULSOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentosAvulsos Failed
 */
export class GetDocumentosAvulsosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_AVULSOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload DocumentosAvulsos
 */
export class ReloadDocumentosAvulsos implements Action
{
    readonly type = RELOAD_DOCUMENTOS_AVULSOS;

    constructor()
    {
    }
}

/**
 * Delete DocumentoAvulso
 */
export class DeleteDocumentoAvulso implements Action
{
    readonly type = DELETE_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete DocumentoAvulso Success
 */
export class DeleteDocumentoAvulsoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete DocumentoAvulso Failed
 */
export class DeleteDocumentoAvulsoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Responder DocumentoAvulso
 */
export class ResponderDocumentoAvulso implements Action
{
    readonly type = RESPONDER_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

export type DocumentoAvulsoListActionsAll
    = GetDocumentosAvulsos
    | GetDocumentosAvulsosSuccess
    | GetDocumentosAvulsosFailed
    | ReloadDocumentosAvulsos
    | DeleteDocumentoAvulso
    | DeleteDocumentoAvulsoSuccess
    | DeleteDocumentoAvulsoFailed
    | ResponderDocumentoAvulso;

