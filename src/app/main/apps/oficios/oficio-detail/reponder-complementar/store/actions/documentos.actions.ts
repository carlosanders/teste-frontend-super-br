import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[DOCUMENTOS CREATE] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[DOCUMENTOS CREATE] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[DOCUMENTOS CREATE] GET DOCUMENTOS FAILED';

export const CLICKED_DOCUMENTO = '[DOCUMENTOS CREATE] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[DOCUMENTOS CREATE] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO = '[DOCUMENTOS CREATE] CONVERTE DOCUMENTO DOCUMENTOS';
export const CONVERTE_DOCUMENTO_SUCESS = '[DOCUMENTOS CREATE] CONVERTE DOCUMENTO DOCUMENTOS SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[DOCUMENTOS CREATE] CONVERTE DOCUMENTO DOCUMENTOS FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[DOCUMENTO CREATE] CHANGE SELECTED DOCUMENTOS';


/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS;

    constructor()
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
 * Change Selected Documentos
 */
export class ChangeSelectedDocumentos implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS;

    constructor(public payload: any) {
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
    | ChangeSelectedDocumentos;
