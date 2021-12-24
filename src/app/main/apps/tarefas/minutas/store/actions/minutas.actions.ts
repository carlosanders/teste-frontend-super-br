import {Action} from '@ngrx/store';

export const GET_DOCUMENTOS_BLOCO = '[MINUTAS TAREFAS] GET DOCUMENTOS';
export const GET_DOCUMENTOS_BLOCO_SUCCESS = '[MINUTAS TAREFAS] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_BLOCO_FAILED = '[MINUTAS TAREFAS] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS_BLOCO = '[MINUTAS TAREFAS] UNLOAD DOCUMENTOS';
export const UNLOAD_DOCUMENTOS_TAREFA = '[MINUTAS TAREFAS] UNLOAD DOCUMENTOS TAREFA';

export const DELETE_DOCUMENTO_BLOCO = '[MINUTAS TAREFAS] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_BLOCO_SUCCESS = '[MINUTAS TAREFAS] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_BLOCO_FAILED = '[MINUTAS TAREFAS] DELETE DOCUMENTO FAILED';

export const UNDELETE_DOCUMENTO = '[MINUTAS TAREFAS] UNDELETE DOCUMENTO';
export const UNDELETE_DOCUMENTO_SUCCESS = '[MINUTAS TAREFAS] UNDELETE DOCUMENTO SUCCESS';
export const UNDELETE_DOCUMENTO_FAILED = '[MINUTAS TAREFAS] UNDELETE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_BLOCO = '[MINUTAS TAREFAS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_BLOCO_SUCCESS = '[MINUTAS TAREFAS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_BLOCO_FAILED = '[MINUTAS TAREFAS] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[MINUTAS TAREFAS] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[MINUTAS TAREFAS] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[MINUTAS TAREFAS] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const REMOVE_DOCUMENTO_ID_FROM_TAREFA = '[MINUTAS TAREFAS] REMOVE DOCUMENTO ID FROM TAREFA';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE';
export const CONVERTE_DOCUMENTO_SUCESS = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE_HTML = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[MINUTAS TAREFAS] CONVERTE DOCUMENTO ATIVIDADE HTML FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[MINUTAS TAREFAS] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[MINUTAS TAREFAS] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[MINUTAS TAREFAS] REMOVE ASSINATURA DOCUMENTO FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[MINUTAS TAREFAS] DOWNLOAD DOCUMENTOP7S ATIVIDADE';
export const DOWNLOAD_DOCUMENTO_P7S_SUCCESS = '[MINUTAS TAREFAS] DOWNLOAD DOCUMENTOP7S ATIVIDADE SUCCESS';
export const DOWNLOAD_DOCUMENTO_P7S_FAILED = '[MINUTAS TAREFAS] DOWNLOAD DOCUMENTOP7S FAILED';

export const CLICKED_DOCUMENTO_BLOCO = '[MINUTAS TAREFAS] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO_BLOCO = '[MINUTAS TAREFAS] COMPLETE DOCUMENTO';

export const UPDATE_DOCUMENTO_BLOCO = '[MINUTAS TAREFAS] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_BLOCO_SUCCESS = '[MINUTAS TAREFAS] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_BLOCO_FAILED = '[MINUTAS TAREFAS] UPDATE DOCUMENTO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_BLOCO = '[MINUTAS TAREFAS] CHANGE SELECTED DOCUMENTOS';

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

    constructor(public payload: any)
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
 * Unload Documentos Tarefa
 */
export class UnloadDocumentosTarefa implements Action
{
    readonly type = UNLOAD_DOCUMENTOS_TAREFA;

    constructor(public payload: any)
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
 * Undelete Documento
 */
export class UndeleteDocumento implements Action
{
    readonly type = UNDELETE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Undelete Documento Success
 */
export class UndeleteDocumentoSuccess implements Action
{
    readonly type = UNDELETE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Undelete Documento Failed
 */
export class UndeleteDocumentoFailed implements Action
{
    readonly type = UNDELETE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Documento Id from Tarefa
 */
export class RemoveDocumentoIdFromTarefa implements Action
{
    readonly type = REMOVE_DOCUMENTO_ID_FROM_TAREFA;

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

export type MinutasActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | UpdateDocumentoBloco
    | UpdateDocumentoBlocoSuccess
    | UpdateDocumentoBlocoFailed
    | UnloadDocumentos
    | UnloadDocumentosTarefa
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
    | UndeleteDocumento
    | UndeleteDocumentoSuccess
    | UndeleteDocumentoFailed
    | RemoveDocumentoIdFromTarefa
    | ChangeSelectedDocumentos;
