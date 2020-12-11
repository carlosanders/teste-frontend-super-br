import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[PROCESSO VIEW] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[PROCESSO VIEW] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[PROCESSO VIEW] GET DOCUMENTOS FAILED';

export const UNLOAD_DOCUMENTOS = '[PROCESSO VIEW] UNLOAD DOCUMENTOS';

export const DELETE_DOCUMENTO = '[PROCESSO VIEW] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[PROCESSO VIEW] DELETE DOCUMENTO FAILED';

export const UPDATE_DOCUMENTO = '[PROCESSO VIEW] UPDATE DOCUMENTO';
export const UPDATE_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] UPDATE DOCUMENTO SUCCESS';
export const UPDATE_DOCUMENTO_FAILED = '[PROCESSO VIEW] UPDATE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[PROCESSO VIEW] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[PROCESSO VIEW] ASSINA DOCUMENTO FAILED';

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

export const CHANGE_SELECTED_DOCUMENTOS = '[PROCESSO VIEW] CHANGE SELECTED DOCUMENTOS';

export const REMOVE_VINCULACAO_DOCUMENTO = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO';
export const REMOVE_VINCULACAO_DOCUMENTO_SUCCESS = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO SUCCESS';
export const REMOVE_VINCULACAO_DOCUMENTO_FAILED = '[PROCESSO VIEW] REMOVE VINCULACAO DOCUMENTO FAILED';

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

    constructor()
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

export type ProcessoViewDocumentosActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
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
    | ChangeSelectedDocumentos
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | UnloadDocumentos
    | RemoveVinculacaoDocumento
    | RemoveVinculacaoDocumentoSuccess
    | RemoveVinculacaoDocumentoFailed;
