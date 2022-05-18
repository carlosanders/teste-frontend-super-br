import {Action} from '@ngrx/store';

export const ASSINA_DOCUMENTO = '[ASSINATURA] ASSINA DOCUMENTO';

export const ASSINA_DOCUMENTO_SUCCESS = '[ASSINATURA] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_FAILED = '[ASSINATURA] ASSINA DOCUMENTO FAILED';

export const PREPARA_ASSINATURA_SUCCESS = '[ASSINATURA] PREPARA ASSINATURA SUCCESS';
export const PREPARA_ASSINATURA_FAILED = '[ASSINATURA] PREPARA ASSINATURA FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[ASSINATURA] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[ASSINATURA] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[ASSINATURA] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE_GOVBR = '[ASSINATURA] ASSINA DOCUMENTO ELETRONICAMENTE GOVBR';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_GOVBR_SUCCESS = '[ASSINATURA] ASSINA DOCUMENTO ELETRONICAMENTE GOVBR SUCCESS';
export const REVALIDA_LOGIN_GOVBR = '[ASSINATURA] REVALIDA LOGIN GOVBR';

export const REMOVE_ASSINATURA_DOCUMENTO = '[ASSINATURA] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[ASSINATURA] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[ASSINATURA] REMOVE ASSINATURA DOCUMENTO FAILED';

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
 * Assina Documento Eletronicamente Success
 */
 export class AssinaDocumentoEletronicamenteGovBrSuccess implements Action
 {
     readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_GOVBR_SUCCESS;

     constructor(public payload: any)
     {
     }
 }

 /**
 * Assina Documento Eletronicamente GovBr
 */
  export class AssinaDocumentoEletronicamenteGovBr implements Action
  {
      readonly type = ASSINA_DOCUMENTO_ELETRONICAMENTE_GOVBR;

      constructor(public payload: any)
      {
      }
  }


export class RevalidaLoginGovBR implements Action {
    readonly type = REVALIDA_LOGIN_GOVBR;
    constructor(public payload: any) {}
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

export type AssinaturaActionsAll
    = AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | PreparaAssinaturaSuccess
    | PreparaAssinaturaFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | AssinaDocumentoEletronicamenteGovBr
    | AssinaDocumentoEletronicamenteGovBrSuccess
    | RevalidaLoginGovBR
    | RemoveAssinaturaDocumento
    | RemoveAssinaturaDocumentoSuccess
    | RemoveAssinaturaDocumentoFailed;
