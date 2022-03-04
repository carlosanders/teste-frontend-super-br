import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS = '[ATIVIDADE CREATE] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[ATIVIDADE CREATE] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[ATIVIDADE CREATE] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS = '[ATIVIDADE CREATE] UNLOAD DOCUMENTOS';

export const DELETE_DOCUMENTO = '[ATIVIDADE CREATE] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[ATIVIDADE CREATE] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[ATIVIDADE CREATE] DELETE DOCUMENTO FAILED';

export const DELETE_DOCUMENTO_FLUSH = '[ATIVIDADE CREATE] DELETE DOCUMENTO FLUSH';
export const DELETE_DOCUMENTO_CANCEL = '[ATIVIDADE CREATE] DELETE DOCUMENTO CANCEL';
export const DELETE_DOCUMENTO_CANCEL_SUCCESS = '[ATIVIDADE CREATE] DELETE DOCUMENTO CANCEL SUCCESS';

export const UPDATE_DOCUMENTO = '[ATIVIDADE CREATE] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[ATIVIDADE CREATE] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[ATIVIDADE CREATE] UPDATE DOCUMENTO FAILED';

export const CLICKED_DOCUMENTO = '[ATIVIDADE CREATE] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[ATIVIDADE CREATE] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE';
export const CONVERTE_DOCUMENTO_SUCESS = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE_HTML = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S ATIVIDADE';
export const DOWNLOAD_DOCUMENTO_P7S_SUCCESS = '[ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S ATIVIDADE SUCCESS';
export const DOWNLOAD_DOCUMENTO_P7S_FAILED = '[ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S FAILED';

export const UNDELETE_DOCUMENTO = '[ATIVIDADE CREATE] UNDELETE DOCUMENTO';
export const UNDELETE_DOCUMENTO_SUCCESS = '[ATIVIDADE CREATE] UNDELETE DOCUMENTO SUCCESS';
export const UNDELETE_DOCUMENTO_FAILED = '[ATIVIDADE CREATE] UNDELETE DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[ATIVIDADE CREATE] CHANGE SELECTED DOCUMENTOS';

export const SET_SAVING = '[ATIVIDADE CREATE] SET SAVING COMPONENTES DIGITAIS';

export const REMOVE_MINUTAS_TAREFA = '[ATIVIDADE CREATE] REMOVE MINUTAS TAREFA';

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

    constructor(public payload = {})
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
 * Delete Documento Flush
 */
export class DeleteDocumentoFlush implements Action {
    readonly type = DELETE_DOCUMENTO_FLUSH;

    constructor() {
    }
}

/**
 * Delete Documento Cancel
 */
export class DeleteDocumentoCancel implements Action {
    readonly type = DELETE_DOCUMENTO_CANCEL;

    constructor() {
    }
}

/**
 * Delete Documento Cancel Success
 */
export class DeleteDocumentoCancelSuccess implements Action {
    readonly type = DELETE_DOCUMENTO_CANCEL_SUCCESS;

    constructor(public payload: any) {
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

/**
 * Converte Documento HTML
 */
export class ConverteToHtml implements Action
{
    readonly type = CONVERTE_DOCUMENTO_ATIVIDADE_HTML;

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
 * Undelete Documento
 */
export class UndeleteDocumento implements Action {
    readonly type = UNDELETE_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Documento Success
 */
export class UndeleteDocumentoSuccess implements Action {
    readonly type = UNDELETE_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Undelete Documento Failed
 */
export class UndeleteDocumentoFailed implements Action {
    readonly type = UNDELETE_DOCUMENTO_FAILED;

    constructor(public payload: any) {
    }
}

export class SetSavingComponentesDigitais implements Action
{
    readonly type = SET_SAVING;

    constructor()
    {
    }
}


/**
 * Remove Minutas Tarefa
 */
export class RemoveMinutasTarefa implements Action
{
    readonly type = REMOVE_MINUTAS_TAREFA;

    constructor(public payload: any)
    {
    }
}

export type AtividadeCreateDocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
    | CompleteDocumento
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | DeleteDocumentoFlush
    | DeleteDocumentoCancel
    | DeleteDocumentoCancelSuccess
    | ChangeSelectedDocumentos
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed
    | DownloadP7S
    | DownloadP7SFailed
    | DownloadP7SSuccess
    | UnloadDocumentos
    | UndeleteDocumento
    | UndeleteDocumentoSuccess
    | UndeleteDocumentoFailed
    | SetSavingComponentesDigitais
    | RemoveMinutasTarefa;
