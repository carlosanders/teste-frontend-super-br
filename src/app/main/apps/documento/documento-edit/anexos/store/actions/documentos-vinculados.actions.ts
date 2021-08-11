import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT] GET DOCUMENTOS VINCULADOS';
export const GET_DOCUMENTOS_VINCULADOS_SUCCESS = '[DOCUMENTO EDIT] GET DOCUMENTOS VINCULADOS SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_FAILED = '[DOCUMENTO EDIT] GET DOCUMENTOS VINCULADOS FAILED';

export const DELETE_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT] DELETE DOCUMENTO VINCULADO';
export const DELETE_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO EDIT] DELETE DOCUMENTO VINCULADO SUCCESS';
export const DELETE_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO EDIT] DELETE DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO';
export const ASSINA_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO FAILED';

export const PREPARA_ASSINATURA_VINCULADO_SUCCESS = '[DOCUMENTO EDIT] PREPARA ASSINATURA DOCUMENTO VINCULADO SUCCESS';
export const PREPARA_ASSINATURA_VINCULADO_FAILED = '[DOCUMENTO EDIT] PREPARA ASSINATURA DOCUMENTO VINCULADO FAILED';

export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_SUCCESS = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO  ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE_FAILED = '[DOCUMENTO EDIT] ASSINA DOCUMENTO VINCULADO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT] REMOVE ASSINATURA DOCUMENTO VINCULADO';
export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_SUCCESS = '[DOCUMENTO EDIT] REMOVE ASSINATURA DOCUMENTO VINCULADO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_VINCULADO_FAILED = '[DOCUMENTO EDIT] REMOVE ASSINATURA DOCUMENTO VINCULADO FAILED';

export const CLICKED_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT] CLICKED DOCUMENTO VINCULADO';
export const COMPLETE_DOCUMENTO_VINCULADO = '[DOCUMENTO EDIT] COMPLETE DOCUMENTO VINCULADO';

export const CHANGE_SELECTED_DOCUMENTOS_VINCULADOS = '[DOCUMENTO EDIT] CHANGE SELECTED DOCUMENTOS VINCULADOS';

export const UPDATE_DOCUMENTO = '[DOCUMENTO EDIT] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[DOCUMENTO EDIT] UPDATE DOCUMENTO FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[DOCUMENTO EDIT] DOWNLOAD DOCUMENTOP7S DOCUMENTO';
export const DOWNLOAD_DOCUMENTO_P7S_SUCCESS = '[DOCUMENTO EDIT] DOWNLOAD DOCUMENTOP7S DOCUMENTO SUCCESS';
export const DOWNLOAD_DOCUMENTO_P7S_FAILED = '[DOCUMENTO EDIT] DOWNLOAD DOCUMENTOP7S FAILED';

export const SET_SAVING = '[DOCUMENTO EDIT] SET SAVING COMPONENTES DIGITAIS';

/**
 * Get Documentos Vinculados
 */
export class GetDocumentosVinculados implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS;

    constructor()
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
 * Clicked Documento Vinculado
 */
export class ClickedDocumentoVinculado implements Action
{
    readonly type = CLICKED_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
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
 * Download Documento P7S
 */
export class DownloadP7S implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_P7S;

    constructor(public payload: any)
    {
    }
}

export class DownloadP7SSuccess implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_P7S_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DownloadP7SFailed implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_P7S_FAILED;

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

export type DocumentosVinculadosActionsAll
    = GetDocumentosVinculados
    | GetDocumentosVinculadosSuccess
    | GetDocumentosVinculadosFailed
    | ClickedDocumentoVinculado
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
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | DownloadP7S
    | DownloadP7SFailed
    | DownloadP7SSuccess
    | SetSavingComponentesDigitais;
