import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA';
export const GET_JUNTADA_SUCCESS = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA SUCCESS';
export const GET_JUNTADA_FAILED = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA FAILED';

export const GET_JUNTADA_VINCULADA = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA VINCULADA';
export const GET_JUNTADA_VINCULADA_SUCCESS = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA VINCULADA SUCCESS';
export const GET_JUNTADA_VINCULADA_FAILED = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] GET JUNTADA VINCULADA FAILED';

export const CREATE_VINCULACAO_DOCUMENTO = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] CREATE VINCULACAO DOCUMENTO';
export const CREATE_VINCULACAO_DOCUMENTO_SUCCESS = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] CREATE VINCULACAO DOCUMENTO SUCCESS';

export const SAVE_VINCULACAO_DOCUMENTO = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] SAVE VINCULACAO DOCUMENTO';
export const SAVE_VINCULACAO_DOCUMENTO_SUCCESS = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] SAVE VINCULACAO_DOCUMENTO SUCCESS';
export const SAVE_VINCULACAO_DOCUMENTO_FAILED = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] SAVE VINCULACAO_DOCUMENTO FAILED';

export const UNLOAD_JUNTADA_VINCULADA = '[PROCESSO VIEW JUNTADA VINCULACAO DOCUMENTO] UNLOAD JUNTADA VINCULADA';

/**
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Success
 */
export class GetJuntadaSuccess implements Action
{
    readonly type = GET_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Failed
 */
export class GetJuntadaFailed implements Action
{
    readonly type = GET_JUNTADA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Juntada Vinculada
 */
export class GetJuntadaVinculada implements Action
{
    readonly type = GET_JUNTADA_VINCULADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Vinculada Success
 */
export class GetJuntadaVinculadaSuccess implements Action
{
    readonly type = GET_JUNTADA_VINCULADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Vinculada Failed
 */
export class GetJuntadaVinculadaFailed implements Action
{
    readonly type = GET_JUNTADA_VINCULADA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoDocumento
 */
export class SaveVinculacaoDocumento implements Action
{
    readonly type = SAVE_VINCULACAO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoDocumento Success
 */
export class SaveVinculacaoDocumentoSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoDocumento Failed
 */
export class SaveVinculacaoDocumentoFailed implements Action
{
    readonly type = SAVE_VINCULACAO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoDocumento
 */
export class CreateVinculacaoDocumento implements Action
{
    readonly type = CREATE_VINCULACAO_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Create VinculacaoDocumento Success
 */
export class CreateVinculacaoDocumentoSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Juntada Vinculada
 */
export class UnloadJuntadaVinculada implements Action
{
    readonly type = UNLOAD_JUNTADA_VINCULADA;

    constructor()
    {
    }
}

export type ProcessoViewVinculacaoDocumentoActionsAll
    = GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | GetJuntadaVinculada
    | GetJuntadaVinculadaSuccess
    | GetJuntadaVinculadaFailed
    | CreateVinculacaoDocumento
    | CreateVinculacaoDocumentoSuccess
    | SaveVinculacaoDocumento
    | SaveVinculacaoDocumentoSuccess
    | SaveVinculacaoDocumentoFailed
    | UnloadJuntadaVinculada;

