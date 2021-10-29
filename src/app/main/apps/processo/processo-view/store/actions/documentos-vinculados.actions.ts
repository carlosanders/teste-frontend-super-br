import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[PROCESSO VIEW] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[PROCESSO VIEW] DELETE DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO';
export const ASSINA_DOCUMENTO_VINCULADO_SUCCESS = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_FAILED = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO FAILED';

export const PREPARA_ASSINATURA_VINCULADO_SUCCESS = '[PROCESSO VIEW] PREPARA ASSINATURA DOCUMENTO VINCULADO SUCCESS';
export const PREPARA_ASSINATURA_VINCULADO_FAILED = '[PROCESSO VIEW] PREPARA ASSINATURA DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO  ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED = '[PROCESSO VIEW] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO VINCULADO';
export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_SUCCESS = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO VINCULADO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_FAILED = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO VINCULADO FAILED';

export const COMPLETE_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[PROCESSO VIEW] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const UPDATE_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] UPDATE DOCUMENTO VINCULADO';
export const UPDATE_DOCUMENTO_VINCULADO_SUCCESS = '[PROCESSO VIEW] UPDATE DOCUMENTO VINCULADO SUCCESS';
export const UPDATE_DOCUMENTO_VINCULADO_FAILED = '[PROCESSO VIEW] UPDATE DOCUMENTO VINCULADO FAILED';

export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO VINCULADO P7S';
export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S_SUCCESS = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO VINCULADO P7S SUCCESS';
export const DOWNLOAD_DOCUMENTO_VINCULADO_P7S_FAILED = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO VINCULADO P7S FAILED';

export const SET_SAVING = '[PROCESSO VIEW] SET SAVING COMPONENTES DIGITAIS';
export const UNLOAD_DOCUMENTOS_VINCULADOS = '[PROCESSO VIEW] UNLOAD DOCUMENTOS VINCULADOS';

/**
 * Get Documentos Vinculados
 */
export class GetDocumentosVinculados implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Success
 */
export class GetDocumentosVinculadosSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Failed
 */
export class GetDocumentosVinculadosFailed implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Delete Documento Vinculado
 */
export class DeleteDocumentoVinculado implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Success
 */
export class DeleteDocumentoVinculadoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Vinculado Failed
 */
export class DeleteDocumentoVinculadoFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado
 */
export class AssinaDocumentoVinculado implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Success
 */
export class AssinaDocumentoVinculadoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Failed
 */
export class AssinaDocumentoVinculadoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Prepara Assinatura Vinculado Success
 */
export class PreparaAssinaturaVinculadoSuccess implements Action
{
    readonly type = PREPARA_ASSINATURA_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Prepara Assinatura Vinculado Failed
 */
export class PreparaAssinaturaVinculadoFailed implements Action
{
    readonly type = PREPARA_ASSINATURA_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente
 */
export class AssinaDocumentoVinculadoEletronicamente implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente Success
 */
export class AssinaDocumentoVinculadoEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Vinculado Eletronicamente Failed
 */
export class AssinaDocumentoVinculadoEletronicamenteFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Vinculado
 */
export class RemoveAssinaturaDocumentoVinculado implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Vinculado Success
 */
export class RemoveAssinaturaDocumentoVinculadoSuccess implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Vinculado Failed
 */
export class RemoveAssinaturaDocumentoVinculadoFailed implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos Vinculados
 */
export class ChangeSelectedDocumentosVinculados implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any) {
    }
}

/**
 * Complete Documento Vinculado
 */
export class CompleteDocumentoVinculado implements Action
{
    readonly type = COMPLETE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update DocumentoVinculado
 */
export class UpdateDocumentoVinculado implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update DocumentoVinculado Success
 */
export class UpdateDocumentoVinculadoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save DocumentoVinculado Failed
 */
export class UpdateDocumentoVinculadoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Download DocumentoVinculado P7S
 */
export class DownloadVinculadoP7S implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S;

    constructor(public payload: any)
    {
    }
}

/**
 * Download DocumentoVinculado P7S Success
 */
export class DownloadVinculadoP7SSuccess implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Download DocumentoVinculado P7S Failed
 */
export class DownloadVinculadoP7SFailed implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_VINCULADO_P7S_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetSavingComponentesDigitais implements Action
{
    readonly type = SET_SAVING;

    constructor()
    {
    }
}

export class UnloadDocumentosVinculados implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_VINCULADOS;

    constructor(public payload: any)
    {
    }
}

export type DocumentosVinculadosActionsAll
    = GetDocumentosVinculados
    | GetDocumentosVinculadosSuccess
    | GetDocumentosVinculadosFailed
    | CompleteDocumentoVinculado
    | AssinaDocumentoVinculado
    | AssinaDocumentoVinculadoSuccess
    | AssinaDocumentoVinculadoFailed
    | PreparaAssinaturaVinculadoSuccess
    | PreparaAssinaturaVinculadoFailed
    | AssinaDocumentoVinculadoEletronicamente
    | AssinaDocumentoVinculadoEletronicamenteSuccess
    | AssinaDocumentoVinculadoEletronicamenteFailed
    | RemoveAssinaturaDocumentoVinculado
    | RemoveAssinaturaDocumentoVinculadoSuccess
    | RemoveAssinaturaDocumentoVinculadoFailed
    | DeleteDocumentoVinculado
    | DeleteDocumentoVinculadoSuccess
    | DeleteDocumentoVinculadoFailed
    | ChangeSelectedDocumentosVinculados
    | UpdateDocumentoVinculado
    | UpdateDocumentoVinculadoSuccess
    | UpdateDocumentoVinculadoFailed
    | DownloadVinculadoP7S
    | DownloadVinculadoP7SFailed
    | DownloadVinculadoP7SSuccess
    | SetSavingComponentesDigitais
    | UnloadDocumentosVinculados;
