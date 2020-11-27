import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[JUNTADA LIST] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[JUNTADA LIST] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[JUNTADA LIST] GET JUNTADAS FAILED';

export const RELOAD_JUNTADAS = '[JUNTADA LIST] RELOAD JUNTADAS';

export const DESENTRANHAMENTO_JUNTADA = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA';
export const DESENTRANHAMENTO_JUNTADA_SUCCESS = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA SUCCESS';
export const DESENTRANHAMENTO_JUNTADA_FAILED = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA FAILED';

export const COPIA_DOCUMENTO_JUNTADA = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA';
export const COPIA_DOCUMENTO_JUNTADA_SUCCESS = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA SUCCESS';
export const COPIA_DOCUMENTO_JUNTADA_FAILED = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA FAILED';

export const ASSINA_DOCUMENTO_JUNTADA = '[JUNTADA LIST] ASSINA DOCUMENTO';
export const ASSINA_DOCUMENTO_JUNTADA_SUCCESS = '[JUNTADA LIST] ASSINA DOCUMENTO SUCCESS';
export const ASSINA_DOCUMENTO_JUNTADA_FAILED = '[JUNTADA LIST] ASSINA DOCUMENTO FAILED';

export const ASSINA_DOCUMENTO_ELETRONICAMENTE = '[JUNTADA LIST] ASSINA DOCUMENTO ELETRONICAMENTE';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS = '[JUNTADA LIST] ASSINA DOCUMENTO ELETRONICAMENTE SUCCESS';
export const ASSINA_DOCUMENTO_ELETRONICAMENTE_FAILED = '[JUNTADA LIST] ASSINA DOCUMENTO ELETRONICAMENTE FAILED';

export const REMOVE_ASSINATURA_DOCUMENTO = '[JUNTADA LIST] REMOVE ASSINATURA DOCUMENTO';
export const REMOVE_ASSINATURA_DOCUMENTO_SUCCESS = '[JUNTADA LIST] REMOVE ASSINATURA DOCUMENTO SUCCESS';
export const REMOVE_ASSINATURA_DOCUMENTO_FAILED = '[JUNTADA LIST] REMOVE ASSINATURA DOCUMENTO FAILED';

export const REMOVE_VINCULACAO_DOCUMENTO = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO';
export const REMOVE_VINCULACAO_DOCUMENTO_SUCCESS = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO SUCCESS';
export const REMOVE_VINCULACAO_DOCUMENTO_FAILED = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO FAILED';


/**
 * Get Juntadas
 */
export class GetJuntadas implements Action
{
    readonly type = GET_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Success
 */
export class GetJuntadasSuccess implements Action
{
    readonly type = GET_JUNTADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Failed
 */
export class GetJuntadasFailed implements Action
{
    readonly type = GET_JUNTADAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Juntadas
 */
export class ReloadJuntadas implements Action
{
    readonly type = RELOAD_JUNTADAS;

    constructor()
    {
    }
}

/**
 * Desentranhar Juntada
 */
export class DesentranharJuntada implements Action
{
    readonly type = DESENTRANHAMENTO_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Desentranhar Juntada Success
 */
export class DesentranharJuntadaSuccess implements Action
{
    readonly type = DESENTRANHAMENTO_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Desentranhar Juntada Failed
 */
export class DesentranharJuntadaFailed implements Action
{
    readonly type = DESENTRANHAMENTO_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Copiar Documento Juntada
 */
export class CopiarDocumentoJuntada implements Action
{
    readonly type = COPIA_DOCUMENTO_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Copiar Documento Juntada Success
 */
export class CopiarDocumentoJuntadaSuccess implements Action
{
    readonly type = COPIA_DOCUMENTO_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Copiar Documento Juntada Failed
 */
export class CopiarDocumentoJuntadaFailed implements Action
{
    readonly type = COPIA_DOCUMENTO_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Assina Documento
 */
export class AssinaDocumento implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Success
 */
export class AssinaDocumentoSuccess implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Assina Documento Failed
 */
export class AssinaDocumentoFailed implements Action
{
    readonly type = ASSINA_DOCUMENTO_JUNTADA_FAILED;

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

export type JuntadaListActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas
    | CopiarDocumentoJuntada
    | CopiarDocumentoJuntadaSuccess
    | CopiarDocumentoJuntadaFailed
    | DesentranharJuntada
    | DesentranharJuntadaSuccess
    | DesentranharJuntadaFailed
    | AssinaDocumento
    | AssinaDocumentoSuccess
    | AssinaDocumentoFailed
    | AssinaDocumentoEletronicamente
    | AssinaDocumentoEletronicamenteSuccess
    | AssinaDocumentoEletronicamenteFailed
    | RemoveAssinaturaDocumento
    | RemoveAssinaturaDocumentoSuccess
    | RemoveAssinaturaDocumentoFailed
    | RemoveVinculacaoDocumento
    | RemoveVinculacaoDocumentoSuccess
    | RemoveVinculacaoDocumentoFailed;

