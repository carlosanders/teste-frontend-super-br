import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_BLOCO = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS';
export const GET_DOCUMENTOS_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS_BLOCO = '[BLOCO ATIVIDADE CREATE] UNLOAD DOCUMENTOS';

export const DELETE_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] DELETE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[BLOCO ATIVIDADE CREATE] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE';
export const CONVERTE_DOCUMENTO_SUCESS = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE_HTML = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[BLOCO ATIVIDADE CREATE] CONVERTE DOCUMENTO ATIVIDADE HTML FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[BLOCO ATIVIDADE CREATE] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[BLOCO ATIVIDADE CREATE] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[BLOCO ATIVIDADE CREATE] REMOVE ASSINATURA DOCUMENTO FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[BLOCO ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S ATIVIDADE';
export const DOWNLOAD_DOCUMENTO_P7S_SUCCESS = '[BLOCO ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S ATIVIDADE SUCCESS';
export const DOWNLOAD_DOCUMENTO_P7S_FAILED = '[BLOCO ATIVIDADE CREATE] DOWNLOAD DOCUMENTOP7S FAILED';

export const CLICKED_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] COMPLETE DOCUMENTO';

export const UPDATE_DOCUMENTO_BLOCO = '[BLOCO ATIVIDADE CREATE] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_BLOCO_SUCCESS = '[BLOCO ATIVIDADE CREATE] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_BLOCO_FAILED = '[BLOCO ATIVIDADE CREATE] UPDATE DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_BLOCO = '[BLOCO ATIVIDADE CREATE] CHANGE SELECTED DOCUMENTOS';

/**
 * Update Documento Bloco
 */
export class UpdateDocumentoBloco implements Action
{
    readonly type = UPDATE_DOCUMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Documento Bloco Success
 */
export class UpdateDocumentoBlocoSuccess implements Action
{
    readonly type = UPDATE_DOCUMENTO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Documento Bloco Failed
 */
export class UpdateDocumentoBlocoFailed implements Action
{
    readonly type = UPDATE_DOCUMENTO_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

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
 * Unload Documentos
 */
export class UnloadDocumentos implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_BLOCO;

    constructor()
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
    | UpdateDocumentoBloco
    | UpdateDocumentoBlocoSuccess
    | UpdateDocumentoBlocoFailed
    | UnloadDocumentos
    | ClickedDocumento
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed
    | DownloadP7S
    | DownloadP7SFailed
    | DownloadP7SSuccess
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
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos;
