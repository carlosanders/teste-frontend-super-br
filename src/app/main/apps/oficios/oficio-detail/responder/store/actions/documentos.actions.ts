import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS FAILED';

export const DELETE_DOCUMENTO = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO FAILED';

export const GET_DOCUMENTO_RESPOSTA = '[RESPONDER DOCUMENTOS] GET DOCUMENTO RESPOSTA';

export const CLICKED_DOCUMENTO = '[RESPONDER DOCUMENTOS] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[RESPONDER DOCUMENTOS] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO DOCUMENTOS';
export const CONVERTE_DOCUMENTO_SUCESS = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[RESPONDER DOCUMENTOS] CHANGE SELECTED DOCUMENTOS';


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
 * Delete Documento
 */
export class DeleteDocumento implements Action
{
    readonly type = DELETE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Success
 */
export class DeleteDocumentoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Failed
 */
export class DeleteDocumentoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Clicked Documento
 */
export class ClickedDocumento implements Action
{
    readonly type = CLICKED_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Complete Documento
 */
export class CompleteDocumento implements Action
{
    readonly type = COMPLETE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Converte Documento
 */
export class ConverteToPdf implements Action
{
    readonly type = CONVERTE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

export class ConverteToPdfSucess implements Action
{
    readonly type = CONVERTE_DOCUMENTO_SUCESS;

    constructor(public payload: any)
    {
    }
}

export class ConverteToPdfFailed implements Action
{
    readonly type = CONVERTE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Success
 */
export class AssinaDocumentoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Failed
 */
export class AssinaDocumentoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos
 */
export class ChangeSelectedDocumentos implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS;

    constructor(public payload: any) {
    }
}


/**
 * Get Documentos
 */
export class GetDocumentoResposta implements Action
{
    readonly type = GET_DOCUMENTO_RESPOSTA;

    constructor(public payload: any)
    {
    }
}

export type DocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
    | CompleteDocumento
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos
    | GetDocumentoResposta;
