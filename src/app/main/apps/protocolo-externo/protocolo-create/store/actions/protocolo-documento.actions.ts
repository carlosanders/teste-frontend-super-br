import {Action} from '@ngrx/store';

export const ENVIAR_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA';
export const ENVIAR_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA SUCCESS';
export const ENVIAR_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] ENVIAR RESPOSTA FAILED';

export const GET_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[PROTOCOLO-DOCUMENTO] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] UNLOAD DOCUMENTOS';
export const CLICKED_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] CLICKED DOCUMENTO';

export const ASSINA_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[PROTOCOLO-DOCUMENTO] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] REMOVE ASSINATURA DOCUMENTO FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE';
export const CONVERTE_DOCUMENTO_SUCESS = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE FAILED';

export const CONVERTE_DOCUMENTO_ATIVIDADE_HTML = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE HTML';
export const CONVERTE_DOCUMENTO_HTML_SUCESS = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE HTML SUCCESS';
export const CONVERTE_DOCUMENTO_HTML_FAILED = '[PROTOCOLO-DOCUMENTO] CONVERTE DOCUMENTO ATIVIDADE HTML FAILED';

export const DOWNLOAD_DOCUMENTO_P7S = '[PROTOCOLO-DOCUMENTO] DOWNLOAD DOCUMENTO P7S';
export const DOWNLOAD_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] DOWNLOAD DOCUMENTO P7S SUCESS';
export const DOWNLOAD_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] DOWNLOAD DOCUMENTO P7S FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] CHANGE SELECTED DOCUMENTOS';

export const UPDATE_DOCUMENTO = '[PROTOCOLO-DOCUMENTO] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[PROTOCOLO-DOCUMENTO] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[PROTOCOLO-DOCUMENTO] UPDATE DOCUMENTO FAILED';

export const SET_SAVING = '[PROTOCOLO-DOCUMENTO] SET SAVING COMPONENTES DIGITAIS';

export const RELOAD_DOCUMENTOS = '[PROTOCOLO-DOCUMENTO] RELOAD DOCUMENTOS';


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
 * Clicked Documento
 */
export class ClickedDocumento implements Action
{
    readonly type = CLICKED_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}


export class EnviarDocumento implements Action {
    readonly type = ENVIAR_DOCUMENTO;
    constructor(public payload: any) {
    }
}

export class EnviarDocumentoSuccess implements Action {
    readonly type = ENVIAR_DOCUMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}


export class EnviarDocumentoFailed implements Action {
    readonly type = ENVIAR_DOCUMENTO_FAILED;
    constructor(public payload: any) {
    }
}

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

export class ChangeSelectedDocumentos implements Action
{
    readonly type = CHANGE_SELECTED_DOCUMENTOS;

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

export type ProtocoloDocumentoActionsAll
    = EnviarDocumento
    | EnviarDocumentoSuccess
    | EnviarDocumentoFailed
    | GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | UnloadDocumentos
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | RemoveAssinaturaDocumento
    | RemoveAssinaturaDocumentoSuccess
    | RemoveAssinaturaDocumentoFailed
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | ConverteToHtml
    | ConverteToHtmlSucess
    | ConverteToHtmlFailed
    | DownloadToP7S
    | DownloadToP7SSuccess
    | DownloadToP7SFailed
    | UpdateDocumento
    | UpdateDocumentoSuccess
    | UpdateDocumentoFailed
    | ChangeSelectedDocumentos
    | SetSavingComponentesDigitais
    | ReloadDocumentos;
