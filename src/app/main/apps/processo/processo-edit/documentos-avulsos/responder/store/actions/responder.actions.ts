import { Action } from '@ngrx/store';
import {GetDocumentosComplementaresFailed} from '../../../../../../oficios/oficio-detail/complementar/store/actions';

export const GET_DOCUMENTOS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS FAILED';

export const DELETE_DOCUMENTO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] DELETE DOCUMENTO';
export const DELETE_DOCUMENTO_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] DELETE DOCUMENTO SUCCESS';
export const DELETE_DOCUMENTO_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] DELETE DOCUMENTO FAILED';

export const GET_DOCUMENTO_RESPOSTA = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTO RESPOSTA';

export const CLICKED_DOCUMENTO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] CLICKED DOCUMENTO';
export const COMPLETE_DOCUMENTO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] COMPLETE DOCUMENTO';

export const CONVERTE_DOCUMENTO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO DOCUMENTOS';
export const CONVERTE_DOCUMENTO_SUCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO SUCCESS';
export const CONVERTE_DOCUMENTO_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] CONVERTE DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const CHANGE_SELECTED_DOCUMENTOS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] CHANGE SELECTED DOCUMENTOS';

export const GET_DOCUMENTO_AVULSO = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTO AVULSO';
export const GET_DOCUMENTO_AVULSO_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTO AVULSO SUCCESS';
export const GET_DOCUMENTO_AVULSO_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTO AVULSO FAILED';

export const SAVE_RESPOSTA = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE RESPOSTA';
export const SAVE_RESPOSTA_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE RESPOSTA SUCCESS';
export const SAVE_RESPOSTA_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE RESPOSTA FAILED';

export const SAVE_COMPLEMENTAR = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE COMPLEMENTAR';
export const SAVE_COMPLEMENTAR_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE COMPLEMENTAR SUCCESS';
export const SAVE_COMPLEMENTAR_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] SAVE COMPLEMENTAR FAILED';

export const GET_DOCUMENTOS_COMPLEMENTARES = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES';
export const GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARRES SUCCESS';
export const GET_DOCUMENTOS_COMPLEMENTARES_FAILED = '[DOCUMENTO AVULSO RESPONDER DOCUMENTOS] GET DOCUMENTOS COMPLEMENTARES FAILED';

/**
 * Get DocumentoAvulso
 */
export class GetDocumentoAvulso implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Success
 */
export class GetDocumentoAvulsoSuccess implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get DocumentoAvulso Failed
 */
export class GetDocumentoAvulsoFailed implements Action
{
    readonly type = GET_DOCUMENTO_AVULSO_FAILED;

    constructor(public payload: string)
    {
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

export class SaveResposta implements Action {
    readonly type = SAVE_RESPOSTA;
    constructor(public payload: any) {
    }
}

export class SaveRespostaSuccess implements Action {
    readonly type = SAVE_RESPOSTA_SUCCESS;

    constructor(public payload: any) {
    }
}


export class SaveRespostaFailed implements Action {
    readonly type = SAVE_RESPOSTA_FAILED;
    constructor(public payload: any) {
    }
}

export class SaveComplementar implements Action {
    readonly type = SAVE_COMPLEMENTAR;

    constructor(public payload: any) {
    }
}

export class SaveComplementarSuccess implements Action {
    readonly type = SAVE_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any) {
    }
}


export class SaveComplementarFailed implements Action {
    readonly type = SAVE_COMPLEMENTAR_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Get Documentos
 */
export class GetDocumentosComplementares implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosCompelemtaresSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Success
 */
export class GetDocumentosCompelemtaresFailed implements Action
{
    readonly type = GET_DOCUMENTOS_COMPLEMENTARES_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ResponderActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | ClickedDocumento
    | CompleteDocumento
    | ConverteToPdf
    | ConverteToPdfSucess
    | ConverteToPdfFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | DeleteDocumento
    | DeleteDocumentoSuccess
    | DeleteDocumentoFailed
    | ChangeSelectedDocumentos
    | GetDocumentoResposta
    | GetDocumentoAvulso
    | GetDocumentoAvulsoSuccess
    | GetDocumentoAvulsoFailed
    | SaveResposta
    | SaveRespostaSuccess
    | SaveRespostaFailed
    | SaveComplementar
    | SaveComplementarFailed
    | SaveComplementarSuccess
    | GetDocumentosComplementares
    | GetDocumentosCompelemtaresSuccess
    | GetDocumentosComplementaresFailed;
