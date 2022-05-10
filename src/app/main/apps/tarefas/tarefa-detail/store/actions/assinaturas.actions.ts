import {Action} from '@ngrx/store';

export const ASSINA_DOCUMENTO = '[TAREFA DETAIL] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_SUCCESS = '[TAREFA DETAIL] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[TAREFA DETAIL] ASSINA DOCUMENTO FAILED';

export const PREPARA_ASSINATURA_SUCCESS = '[TAREFA DETAIL] PREPARA ASSINATURA SUCCESS';
export const PREPARA_ASSINATURA_FAILED = '[TAREFA DETAIL] PREPARA ASSINATURA FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[TAREFA DETAIL] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[TAREFA DETAIL] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[TAREFA DETAIL] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

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
    = AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | PreparaAssinaturaSuccess
    | PreparaAssinaturaFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed;
