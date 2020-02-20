import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[TAREFA DOCS CREATE] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[TAREFA DOCS CREATE] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[TAREFA DOCS CREATE] GET DOCUMENTOS FAILED';

export const DELETE_DOCUMENTO = '[TAREFA DOCS CREATE] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[TAREFA DOCS CREATE] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[TAREFA DOCS CREATE] DELETE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[TAREFA DOCS CREATE] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[TAREFA DOCS CREATE] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[TAREFA DOCS CREATE] ASSINA DOCUMENTO FAILED';

export const CLICKED_DOCUMENTO = '[TAREFA DOCS CREATE] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[TAREFA DOCS CREATE] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[TAREFA DOCS CREATE] CONVERTE DOCUMENTO';
export const CONVERTE_DOCUMENTO_SUCESS = '[TAREFA DOCS CREATE] CONVERTE DOCUMENTO SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[TAREFA DOCS CREATE] CONVERTE DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[TAREFA DOCS CREATE] CHANGE SELECTED DOCUMENTOS';

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
    readonly type = CONVERTE_DOCUMENTO_ATIVIDADE;

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

export type TarefaBlocoCreateDocumentosActionsAll
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
    | ChangeSelectedDocumentos
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed;
