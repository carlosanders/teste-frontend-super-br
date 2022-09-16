import {Action} from '@ngrx/store';

export const RELOAD_DOCUMENTO = '[PROCESSO VIEW] RELOAD DOCUMENTO';
export const RELOAD_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] RELOAD DOCUMENTO SUCCESS';
export const RELOAD_DOCUMENTO_FAILED = '[PROCESSO VIEW] RELOAD DOCUMENTO FAILED';

export const DELETE_DOCUMENTO = '[PROCESSO VIEW] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[PROCESSO VIEW] DELETE DOCUMENTO FAILED';

export const UNDELETE_DOCUMENTO = '[PROCESSO VIEW] UNDELETE DOCUMENTO';
export const UNDELETE_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] UNDELETE DOCUMENTO SUCCESS';
export const UNDELETE_DOCUMENTO_FAILED = '[PROCESSO VIEW] UNDELETE DOCUMENTO FAILED';

export const DELETE_DOCUMENTO_FLUSH = '[PROCESSO VIEW] DELETE DOCUMENTO FLUSH';
export const DELETE_DOCUMENTO_CANCEL = '[PROCESSO VIEW] DELETE DOCUMENTO CANCEL';
export const DELETE_DOCUMENTO_CANCEL_SUCCESS = '[PROCESSO VIEW] DELETE DOCUMENTO CANCEL SUCCESS';

export const UPDATE_DOCUMENTO = '[PROCESSO VIEW] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[PROCESSO VIEW] UPDATE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[PROCESSO VIEW] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[PROCESSO VIEW] ASSINA DOCUMENTO FAILED';

export const PREPARA_ASSINATURA_SUCCESS = '[PROCESSO VIEW] PREPARA ASSINATURA SUCCESS';
export const PREPARA_ASSINATURA_FAILED = '[PROCESSO VIEW] PREPARA ASSINATURA FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[PROCESSO VIEW] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[PROCESSO VIEW] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[PROCESSO VIEW] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[PROCESSO VIEW] REMOVE ASSINATURA DOCUMENTO FAILED';

export const ASSINA_JUNTADA = '[PROCESSO VIEW] ASSINA JUNTADA';
export const ASSINA_JUNTADA_SUCCESS = '[PROCESSO VIEW] ASSINA JUNTADA SUCCESS';
export const ASSINA_JUNTADA_FAILED = '[PROCESSO VIEW] ASSINA JUNTADA FAILED';

export const ASSINA_JUNTADA_ELETRONICAMENTE = '[PROCESSO VIEW] ASSINA JUNTADA ELETRONICAMENTE';
export const ASSINA_JUNTADA_ELETRONICAMENTE_SUCCESS = '[PROCESSO VIEW] ASSINA JUNTADA ELETRONICAMENTE SUCCESS';
export const ASSINA_JUNTADA_ELETRONICAMENTE_FAILED = '[PROCESSO VIEW] ASSINA JUNTADA ELETRONICAMENTE FAILED';

export const CLICKED_DOCUMENTO = '[PROCESSO VIEW] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[PROCESSO VIEW] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO = '[PROCESSO VIEW] CONVERTE DOCUMENTO';
export const CONVERTE_DOCUMENTO_SUCESS = '[PROCESSO VIEW] CONVERTE DOCUMENTO SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[PROCESSO VIEW] CONVERTE DOCUMENTO FAILED';

export const CONVERTE_DOCUMENTO_HTML = '[PROCESSO VIEW] CONVERTE DOCUMENTO HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[PROCESSO VIEW] CONVERTE DOCUMENTO HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[PROCESSO VIEW] CONVERTE DOCUMENTO HTML FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO P7S';
export const DOWNLOAD_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO P7S SUCESS';
export const DOWNLOAD_DOCUMENTO_FAILED = '[PROCESSO VIEW] DOWNLOAD DOCUMENTO P7S FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[PROCESSO VIEW] CHANGE SELECTED DOCUMENTOS';

export const REMOVE_VINCULACAO_DOCUMENTO = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO';
export const REMOVE_VINCULACAO_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO SUCCESS';
export const REMOVE_VINCULACAO_DOCUMENTO_FAILED = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO FAILED';

export const DELETE_VISIBILIDADE_DOCUMENTOS = '[PROCESSO VIEW] DELETE VISIBILIDADE DOCUMENTOS';
export const DELETE_VISIBILIDADE_DOCUMENTOS_SUCCESS = '[PROCESSO VIEW] DELETE VISIBILIDADE DOCUMENTOS SUCCESS';
export const DELETE_VISIBILIDADE_DOCUMENTOS_FAILED = '[PROCESSO VIEW] DELETE VISIBILIDADE DOCUMENTOS FAILED';

/**
 * Reload Documento
 */
export class ReloadDocumento implements Action
{
    readonly type = RELOAD_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Reload Documento Success
 */
export class ReloadDocumentoSuccess implements Action
{
    readonly type = RELOAD_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Reload Documento Failed
 */
export class ReloadDocumentoFailed implements Action
{
    readonly type = RELOAD_DOCUMENTO_FAILED;

    constructor(public payload: any)
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
 * Assina Juntada
 */
export class AssinaJuntada implements Action
{
    readonly type = ASSINA_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Juntada Success
 */
export class AssinaJuntadaSuccess implements Action
{
    readonly type = ASSINA_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Juntada Failed
 */
export class AssinaJuntadaFailed implements Action
{
    readonly type = ASSINA_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Juntada Eletronicamente
 */
export class AssinaJuntadaEletronicamente implements Action
{
    readonly type = ASSINA_JUNTADA_ELETRONICAMENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Juntada Eletronicamente Success
 */
export class AssinaJuntadaEletronicamenteSuccess implements Action
{
    readonly type = ASSINA_JUNTADA_ELETRONICAMENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Juntada Eletronicamente Failed
 */
export class AssinaJuntadaEletronicamenteFailed implements Action
{
    readonly type = ASSINA_JUNTADA_ELETRONICAMENTE_FAILED;

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

/**
 * Remove Vinculacao Documento
 */
export class RemoveVinculacaoDocumento implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Vinculacao Documento Success
 */
export class RemoveVinculacaoDocumentoSuccess implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Vinculacao Documento Failed
 */
export class RemoveVinculacaoDocumentoFailed implements Action
{
    readonly type = REMOVE_VINCULACAO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}
/**
 * Delete Visibilidade Documentos
 */
export class DeleteVisibilidadeDocumentos implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Documentos Success
 */
export class DeleteVisibilidadeDocumentosSuccess implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Documentos Failed
 */
export class DeleteVisibilidadeDocumentosFailed implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTOS_FAILED;

    constructor(public payload: any)
    {
    }
}


export type ProcessoViewDocumentosActionsAll
    = ReloadDocumento
    | ReloadDocumentoSuccess
    | ReloadDocumentoFailed
    | ClickedDocumento
    | CompleteDocumento
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
    | AssinaJuntada
    | AssinaJuntadaSuccess
    | AssinaJuntadaFailed
    | AssinaJuntadaEletronicamente
    | AssinaJuntadaEletronicamenteSuccess
    | AssinaJuntadaEletronicamenteFailed
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | UndeleteDocumento
    | UndeleteDocumentoSuccess
    | UndeleteDocumentoFailed
    | DeleteDocumentoFlush
    | DeleteDocumentoCancel
    | DeleteDocumentoCancelSuccess
    | ChangeSelectedDocumentos
    | DownloadToP7S
    | DownloadToP7SSuccess
    | DownloadToP7SFailed
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed
    | RemoveVinculacaoDocumento
    | RemoveVinculacaoDocumentoSuccess
    | RemoveVinculacaoDocumentoFailed
    | DeleteVisibilidadeDocumentos
    | DeleteVisibilidadeDocumentosSuccess
    | DeleteVisibilidadeDocumentosFailed;
