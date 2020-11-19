import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[TAREFA DETAIL OFICIOS] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[TAREFA DETAIL OFICIOS] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[TAREFA DETAIL OFICIOS] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS = '[TAREFA DETAIL OFICIOS] UNLOAD DOCUMENTOS';

export const DELETE_DOCUMENTO = '[TAREFA DETAIL OFICIOS] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[TAREFA DETAIL OFICIOS] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[TAREFA DETAIL OFICIOS] DELETE DOCUMENTO FAILED';

export const UPDATE_DOCUMENTO = '[TAREFA DETAIL OFICIOS] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[TAREFA DETAIL OFICIOS] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[TAREFA DETAIL OFICIOS] UPDATE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[TAREFA DETAIL OFICIOS] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[TAREFA DETAIL OFICIOS] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[TAREFA DETAIL OFICIOS] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[TAREFA DETAIL OFICIOS] REMOVE ASSINATURA DOCUMENTO FAILED';

export const CLICKED_DOCUMENTO = '[TAREFA DETAIL OFICIOS] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[TAREFA DETAIL OFICIOS] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[TAREFA DETAIL OFICIOS] CONVERTE DOCUMENTO ATIVIDADE';
export const CONVERTE_DOCUMENTO_SUCESS = '[TAREFA DETAIL OFICIOS] CONVERTE DOCUMENTO ATIVIDADE SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[TAREFA DETAIL OFICIOS] CONVERTE DOCUMENTO ATIVIDADE FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[TAREFA DETAIL OFICIOS] CHANGE SELECTED DOCUMENTOS';

/**
 * Unload Documentos
 */
export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS;

    constructor()
    {
    }
}

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
 * Update Documento
 */
export class UpdateDocumento implements Action
{
    readonly type = UPDATE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Success
 */
export class UpdateDocumentoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Failed
 */
export class UpdateDocumentoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_FAILED;

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
 * Assina Documento Eletronicamente
 */
export class AssinaDocumentoEletronicamente implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Eletronicamente Success
 */
export class AssinaDocumentoEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Eletronicamente Failed
 */
export class AssinaDocumentoEletronicamenteFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento
 */
export class RemoveAssinaturaDocumento implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Success
 */
export class RemoveAssinaturaDocumentoSuccess implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Failed
 */
export class RemoveAssinaturaDocumentoFailed implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_FAILED;

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

export type TarefaDetailDocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
    | CompleteDocumento
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | RemoveAssinaturaDocumento
    | RemoveAssinaturaDocumentoSuccess
    | RemoveAssinaturaDocumentoFailed
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | UnloadDocumentos;
