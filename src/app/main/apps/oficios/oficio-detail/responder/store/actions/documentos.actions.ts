import {Action} from '@ngrx/store';

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

export const CONVERTE_DOCUMENTO_HTML = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO DOCUMENTOS HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO HTML FAILED';

export const ASSINA_DOCUMENTO = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const PREPARA_ASSINATURA_SUCCESS = '[RESPONDER DOCUMENTOS] PREPARA ASSINATURA DOCUMENTO SUCCESS';
export const PREPARA_ASSINATURA_FAILED = '[RESPONDER DOCUMENTOS] PREPARA ASSINATURA DOCUMENTO FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[RESPONDER DOCUMENTOS] CHANGE SELECTED DOCUMENTOS';

export const UPDATE_DOCUMENTO = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S DOCUMENTO';
export const DOWNLOAD_DOCUMENTO_P7S_SUCCESS = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S DOCUMENTO SUCCESS';
export const DOWNLOAD_DOCUMENTO_P7S_FAILED = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S FAILED';

export const SET_SAVING = '[RESPONDER DOCUMENTOS] SET SAVING COMPONENTES DIGITAIS';

export const RELOAD_DOCUMENTOS = '[RESPONDER DOCUMENTOS] RELOAD DOCUMENTOS';
export const UNLOAD_DOCUMENTOS = '[RESPONDER DOCUMENTOS] UNLOAD DOCUMENTOS';

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
 * Converte Documento HTML
 */
export class ConverteToHtml implements Action
{
    readonly type = CONVERTE_DOCUMENTO_HTML;

    constructor(public payload: any)
    {
    }
}

export class ConverteToHtmlSucess implements Action
{
    readonly type = CONVERTE_DOCUMENTO_HTML_SUCESS;

    constructor(public payload: any)
    {
    }
}

export class ConverteToHtmlFailed implements Action
{
    readonly type = CONVERTE_DOCUMENTO_HTML_FAILED;

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
 * Prepara Assinatura Success
 */
export class PreparaAssinaturaSuccess implements Action
{
    readonly type = PREPARA_ASSINATURA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Prepara Assinatura Failed
 */
export class PreparaAssinaturaFailed implements Action
{
    readonly type = PREPARA_ASSINATURA_FAILED;

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
 * Get Documentos
 */
export class GetDocumentoResposta implements Action
{
    readonly type = GET_DOCUMENTO_RESPOSTA;

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
 * Update Documento Failed
 */
export class UpdateDocumentoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_FAILED;

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

export class ReloadDocumentos implements Action
{
    readonly type = RELOAD_DOCUMENTOS;

    constructor()
    {
    }
}

export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS;

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
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | PreparaAssinaturaSuccess
    | PreparaAssinaturaFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | RemoveAssinaturaDocumento
    | RemoveAssinaturaDocumentoSuccess
    | RemoveAssinaturaDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos
    | GetDocumentoResposta
    | DownloadP7S
    | DownloadP7SSuccess
    | DownloadP7SFailed
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | SetSavingComponentesDigitais
    | ReloadDocumentos
    | UnloadDocumentos;
