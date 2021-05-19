import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS = '[TAREFA LIST] GET DOCUMENTOS';
export const GET_DOCUMENTOS_SUCCESS = '[TAREFA LIST] GET DOCUMENTOS SUCCESS';
export const GET_DOCUMENTOS_FAILED = '[TAREFA LIST] GET DOCUMENTOS FAILED';

export const ASSINA_DOCUMENTO = '[TAREFA LIST] ASSINATURA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[TAREFA LIST] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[TAREFA LIST] ASSINA DOCUMENTO FAILED';

export const PREPARA_ASSINATURA_SUCCESS = '[TAREFA LIST] PREPARA ASSINATURA SUCCESS';
export const PREPARA_ASSINATURA_FAILED = '[TAREFA LIST] PREPARA ASSINATURA FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[TAREFA LIST] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[TAREFA LIST] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[TAREFA LIST] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';


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
 * AssinaDocumento
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

export type AssinaturasActionsAll
    = GetDocumentos
    | GetDocumentosSuccess
    | GetDocumentosFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | PreparaAssinaturaSuccess
    | PreparaAssinaturaFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed;
