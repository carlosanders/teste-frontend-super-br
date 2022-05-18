import {Action} from '@ngrx/store';

export const GET_JUNTADAS = '[JUNTADA LIST] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[JUNTADA LIST] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[JUNTADA LIST] GET JUNTADAS FAILED';

export const DESENTRANHA_JUNTADA = '[JUNTADA LIST] DESENTRANHA JUNTADA';
export const DESENTRANHA_JUNTADA_CANCEL = '[JUNTADA LIST] DESENTRANHA JUNTADA CANCEL';

export const RELOAD_JUNTADAS = '[JUNTADA LIST] RELOAD JUNTADAS';

export const UNLOAD_JUNTADAS = '[JUNTADA LIST] UNLOAD JUNTADAS';

export const COPIA_DOCUMENTO_JUNTADA = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA';
export const COPIA_DOCUMENTO_JUNTADA_SUCCESS = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA SUCCESS';
export const COPIA_DOCUMENTO_JUNTADA_FAILED = '[JUNTADA LIST] COPIA DOCUMENTO JUNTADA FAILED';

export const REMOVE_VINCULACAO_DOCUMENTO = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO';
export const REMOVE_VINCULACAO_DOCUMENTO_SUCCESS = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO SUCCESS';
export const REMOVE_VINCULACAO_DOCUMENTO_FAILED = '[JUNTADA LIST] REMOVE VINCULACAO DOCUMENTO FAILED';

export const REMOVE_RESTRICOES_DOCUMENTO = '[JUNTADA LIST] REMOVE RESTRICOES DOCUMENTO';
export const REMOVE_RESTRICOES_DOCUMENTO_SUCCESS = '[JUNTADA LIST] REMOVE RESTRICOES DOCUMENTO SUCCESS';
export const REMOVE_RESTRICOES_DOCUMENTO_FAILED = '[JUNTADA LIST] REMOVE RESTRICOES DOCUMENTO FAILED';


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
 * Desentranha Juntada
 */
export class DesentranhaJuntada implements Action
{
    readonly type = DESENTRANHA_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Desentranha Juntada Cancel
 */
export class DesentranhaJuntadaCancel implements Action
{
    readonly type = DESENTRANHA_JUNTADA_CANCEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Juntadas
 */
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor()
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
 * Remove Restricoes Documento
 */
export class RemoveRestricoesDocumento implements Action
{
    readonly type = REMOVE_RESTRICOES_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Restricoes Documento Success
 */
export class RemoveRestricoesDocumentoSuccess implements Action
{
    readonly type = REMOVE_RESTRICOES_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Remove Restricoes Documento Failed
 */
export class RemoveRestricoesDocumentoFailed implements Action
{
    readonly type = REMOVE_RESTRICOES_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type JuntadaListActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas
    | UnloadJuntadas
    | DesentranhaJuntada
    | DesentranhaJuntadaCancel
    | CopiarDocumentoJuntada
    | CopiarDocumentoJuntadaSuccess
    | CopiarDocumentoJuntadaFailed
    | RemoveVinculacaoDocumento
    | RemoveVinculacaoDocumentoSuccess
    | RemoveVinculacaoDocumentoFailed
    | RemoveRestricoesDocumento
    | RemoveRestricoesDocumentoSuccess
    | RemoveRestricoesDocumentoFailed;

