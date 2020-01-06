import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS_BLOCO = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS';
export const GET_DOCUMENTOS_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS FAILED';

export const DELETE_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO FAILED';

export const CLICKED_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] COMPLETE DOCUMENTO';

export const CHANGE_SELECTED_DOCUMENTOS_BLOCO = '[BLOCO ATIVIDADE CREATE] CHANGE SELECTED DOCUMENTOS';

/**
 * Get Documentos
 */
export class GetDocumentos implements Action
{
    readonly type = GET_DOCUMENTOS_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Failed
 */
export class GetDocumentosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_BLOCO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Delete Documento
 */
export class DeleteDocumento implements Action
{
    readonly type = DELETE_DOCUMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Success
 */
export class DeleteDocumentoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Failed
 */
export class DeleteDocumentoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Success
 */
export class AssinaDocumentoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Failed
 */
export class AssinaDocumentoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos
 */
export class ChangeSelectedDocumentos implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_BLOCO;

    constructor(public payload: any) {
    }
}

/**
 * Clicked Documento
 */
export class ClickedDocumento implements Action
{
    readonly type = CLICKED_DOCUMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Complete Documento
 */
export class CompleteDocumento implements Action
{
    readonly type = COMPLETE_DOCUMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

export type AtividadeBlocoCreateDocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
    | CompleteDocumento
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos;
