import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_COMPLEMENTARES = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES';
export const GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES SUCCESS';
export const GET_DOCUMENTOS_COMPLEMENTARES_FAILED = '[RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES FAILED';

export const DELETE_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO COMPLEMENTAR';
export const DELETE_DOCUMENTO_COMPLEMENTAR_SUCCESS = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO COMPLEMENTAR SUCCESS';
export const DELETE_DOCUMENTO_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] DELETE DOCUMENTO COMPLEMENTAR FAILED';

export const COMPLETE_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] COMPLETE DOCUMENTO COMPLEMENTAR';

export const CONVERTE_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR';
export const CONVERTE_DOCUMENTO_COMPLEMENTAR_SUCESS = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR SUCCESS';
export const CONVERTE_DOCUMENTO_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR FAILED';

export const CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR HTML';
export const CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_SUCESS = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR HTML SUCCESS';
export const CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_FAILED = '[RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO COMPLEMENTAR HTML FAILED';

export const ASSINA_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR';
export const ASSINA_DOCUMENTO_COMPLEMENTAR_SUCCESS = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR SUCCESS';
export const ASSINA_DOCUMENTO_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR FAILED';
export const PREPARA_ASSINATURA_COMPLEMENTAR_SUCCESS = '[RESPONDER DOCUMENTOS] PREPARA ASSINATURA COMPLEMENTAR SUCCESS';
export const PREPARA_ASSINATURA_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] PREPARA ASSINATURA COMPLEMENTAR FAILED';

export const ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_SUCCESS = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_FAILED = '[RESPONDER DOCUMENTOS] ASSINA DOCUMENTO COMPLEMENTAR ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO COMPLEMENTAR';
export const REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_SUCCESS = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO COMPLEMENTAR SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] REMOVE ASSINATURA DOCUMENTO COMPLEMENTAR FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_COMPLEMENTARES = '[RESPONDER DOCUMENTOS] CHANGE SELECTED DOCUMENTOS COMPLEMENTARES';

export const UPDATE_DOCUMENTO_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO COMPLEMENTAR';
export const UPDATE_DOCUMENTO_COMPLEMENTAR_SUCCESS = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO COMPLEMENTAR SUCCESS';
export const UPDATE_DOCUMENTO_COMPLEMENTAR_FAILED = '[RESPONDER DOCUMENTOS] UPDATE DOCUMENTO COMPLEMENTAR FAILED';

export const DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S DOCUMENTO COMPLEMENTAR';
export const DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_SUCCESS = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S DOCUMENTO COMPLEMENTAR SUCCESS';
export const DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_FAILED = '[RESPONDER DOCUMENTOS] DOWNLOAD DOCUMENTOP7S COMPLEMENTAR FAILED';

export const SET_SAVING_COMPLEMENTAR = '[RESPONDER DOCUMENTOS] SET SAVING COMPONENTES DIGITAIS COMPLEMENTAR';

export const RELOAD_DOCUMENTOS_COMPLEMENTARES = '[RESPONDER DOCUMENTOS] RELOAD DOCUMENTOS COMPLEMENTARES';
export const UNLOAD_DOCUMENTOS_COMPLEMENTARES = '[RESPONDER DOCUMENTOS] UNLOAD DOCUMENTOS COMPLEMENTARES';

/**
 * Get Documentos Complementares
 */
export class GetDocumentosComplementares implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Complementares Success
 */
export class GetDocumentosComplementaresSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Complementares Failed
 */
export class GetDocumentosComplementaresFailed implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Delete Documento Complementar
 */
export class DeleteDocumentoComplementar implements Action
{
    readonly type = DELETE_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Complementar Success
 */
export class DeleteDocumentoComplementarSuccess implements Action
{
    readonly type = DELETE_DOCUMENTO_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Documento Complementar Failed
 */
export class DeleteDocumentoComplementarFailed implements Action
{
    readonly type = DELETE_DOCUMENTO_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Complete Documento Complementar
 */
export class CompleteDocumentoComplementar implements Action
{
    readonly type = COMPLETE_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Converte Documento Complementar
 */
export class ConverteComplementarToPdf implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

export class ConverteComplementarToPdfSucess implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR_SUCESS;

    constructor(public payload: any)
    {
    }
}

export class ConverteComplementarToPdfFailed implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Converte Documento Complementar HTML
 */
export class ConverteComplementarToHtml implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML;

    constructor(public payload: any)
    {
    }
}

export class ConverteComplementarToHtmlSucess implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_SUCESS;

    constructor(public payload: any)
    {
    }
}

export class ConverteComplementarToHtmlFailed implements Action
{
    readonly type = CONVERTE_DOCUMENTO_COMPLEMENTAR_HTML_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar
 */
export class AssinaDocumentoComplementar implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar Success
 */
export class AssinaDocumentoComplementarSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar Failed
 */
export class AssinaDocumentoComplementarFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Prepara Assinatura Complementar Success
 */
export class PreparaAssinaturaComplementarSuccess implements Action
{
    readonly type = PREPARA_ASSINATURA_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Prepara Assinatura Complementar Failed
 */
export class PreparaAssinaturaComplementarFailed implements Action
{
    readonly type = PREPARA_ASSINATURA_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar Eletronicamente
 */
export class AssinaDocumentoComplementarEletronicamente implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar Eletronicamente Success
 */
export class AssinaDocumentoComplementarEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Complementar Eletronicamente Failed
 */
export class AssinaDocumentoComplementarEletronicamenteFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_COMPLEMENTAR_ELETRONICAMENTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Documentos Complementares
 */
export class ChangeSelectedDocumentosComplementares implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_COMPLEMENTARES;

    constructor(public payload: any) {
    }
}

/**
 * Remove Assinatura Documento Complementar
 */
export class RemoveAssinaturaDocumentoComplementar implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Complementar Success
 */
export class RemoveAssinaturaDocumentoComplementarSuccess implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Assinatura Documento Complementar Failed
 */
export class RemoveAssinaturaDocumentoComplementarFailed implements Action
{
    readonly type = REMOVE_ASSINATURA_DOCUMENTO_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Download Documento Complementar P7S
 */
export class DownloadComplementarP7S implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S;

    constructor(public payload: any)
    {
    }
}

export class DownloadComplementarP7SSuccess implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DownloadComplementarP7SFailed implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_COMPLEMENTAR_P7S_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Complementar
 */
export class UpdateDocumentoComplementar implements Action
{
    readonly type = UPDATE_DOCUMENTO_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Complementar Success
 */
export class UpdateDocumentoComplementarSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Complementar Failed
 */
export class UpdateDocumentoComplementarFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

export class SetSavingComplementar implements Action
{
    readonly type = SET_SAVING_COMPLEMENTAR;

    constructor()
    {
    }
}

export class ReloadDocumentosComplementares implements Action
{
    readonly type = RELOAD_DOCUMENTOS_COMPLEMENTARES;

    constructor()
    {
    }
}

export class UnloadDocumentosComplementares implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_COMPLEMENTARES;

    constructor(public payload: any)
    {
    }
}

export type ComplementaresActionsAll
    = GetDocumentosComplementares
    | GetDocumentosComplementaresSuccess
    | GetDocumentosComplementaresFailed
    | CompleteDocumentoComplementar
    | ConverteComplementarToPdf
    | ConverteComplementarToPdfSucess
    | ConverteComplementarToPdfFailed
    | ConverteComplementarToHtml
    | ConverteComplementarToHtmlSucess
    | ConverteComplementarToHtmlFailed
    | AssinaDocumentoComplementar
    | AssinaDocumentoComplementarSuccess
    | AssinaDocumentoComplementarFailed
    | PreparaAssinaturaComplementarSuccess
    | PreparaAssinaturaComplementarFailed
    | AssinaDocumentoComplementarEletronicamente
    | AssinaDocumentoComplementarEletronicamenteSuccess
    | AssinaDocumentoComplementarEletronicamenteFailed
    | DeleteDocumentoComplementar
    | DeleteDocumentoComplementarSuccess
    | DeleteDocumentoComplementarFailed
    | ChangeSelectedDocumentosComplementares
    | RemoveAssinaturaDocumentoComplementar
    | RemoveAssinaturaDocumentoComplementarSuccess
    | RemoveAssinaturaDocumentoComplementarFailed
    | DownloadComplementarP7S
    | DownloadComplementarP7SSuccess
    | DownloadComplementarP7SFailed
    | UpdateDocumentoComplementar
    | UpdateDocumentoComplementarSuccess
    | UpdateDocumentoComplementarFailed
    | SetSavingComplementar
    | ReloadDocumentosComplementares
    | UnloadDocumentosComplementares;
