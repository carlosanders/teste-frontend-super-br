import {Action} from '@ngrx/store';

export const DELETE_DOCUMENTO = '[TAREFAS] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[TAREFAS] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[TAREFAS] DELETE DOCUMENTO FAILED';

export const DELETE_DOCUMENTO_FLUSH = '[TAREFAS] DELETE DOCUMENTO FLUSH';
export const DELETE_DOCUMENTO_CANCEL = '[TAREFAS] DELETE DOCUMENTO CANCEL';
export const DELETE_DOCUMENTO_CANCEL_SUCCESS = '[TAREFAS] DELETE DOCUMENTO CANCEL SUCCESS';

export const UNDELETE_DOCUMENTO = '[TAREFAS] UNDELETE DOCUMENTO';
export const UNDELETE_DOCUMENTO_SUCCESS = '[TAREFAS] UNDELETE DOCUMENTO SUCCESS';
export const UNDELETE_DOCUMENTO_FAILED = '[TAREFAS] UNDELETE DOCUMENTO FAILED';

export const UPDATE_DOCUMENTO = '[TAREFAS] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[TAREFAS] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[TAREFAS] UPDATE DOCUMENTO FAILED';

export const CONVERTE_DOCUMENTO = '[TAREFAS] CONVERTE DOCUMENTO';
export const CONVERTE_DOCUMENTO_SUCESS = '[TAREFAS] CONVERTE DOCUMENTO SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[TAREFAS] CONVERTE DOCUMENTO FAILED';

export const CONVERTE_DOCUMENTO_HTML = '[TAREFAS] CONVERTE DOCUMENTO HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[TAREFAS] CONVERTE DOCUMENTO HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[TAREFAS] CONVERTE DOCUMENTO HTML FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[TAREFAS] DOWNLOAD DOCUMENTO P7S';
export const DOWNLOAD_DOCUMENTO_SUCCESS = '[TAREFAS] DOWNLOAD DOCUMENTO P7S SUCESS';
export const DOWNLOAD_DOCUMENTO_FAILED = '[TAREFAS] DOWNLOAD DOCUMENTO P7S FAILED';

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
 * Download P7S
 */
export class DownloadToP7S implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_P7S;

    constructor(public payload: any)
    {
    }
}

export class DownloadToP7SSuccess implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DownloadToP7SFailed implements Action
{
    readonly type = DOWNLOAD_DOCUMENTO_FAILED;

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

export type TarefasDocumentosActionsAll
    = UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | DeleteDocumentoFlush
    | DeleteDocumentoCancel
    | DeleteDocumentoCancelSuccess
    | UndeleteDocumento
    | UndeleteDocumentoSuccess
    | UndeleteDocumentoFailed
    | DownloadToP7S
    | DownloadToP7SSuccess
    | DownloadToP7SFailed
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed;
