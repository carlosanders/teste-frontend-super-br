import {Action} from '@ngrx/store';

export const GET_ASSINATURAS = '[ASSINATURA LIST] GET ASSINATURAS';
export const GET_ASSINATURAS_SUCCESS = '[ASSINATURA LIST] GET ASSINATURAS SUCCESS';
export const GET_ASSINATURAS_FAILED = '[ASSINATURA LIST] GET ASSINATURAS FAILED';

export const RELOAD_ASSINATURAS = '[ASSINATURA LIST] RELOAD ASSINATURAS';

export const DESENTRANHAMENTO_ASSINATURA = '[ASSINATURA LIST] DESENTRANHAMENTO ASSINATURA';
export const DESENTRANHAMENTO_ASSINATURA_SUCCESS = '[ASSINATURA LIST] DESENTRANHAMENTO ASSINATURA SUCCESS';
export const DESENTRANHAMENTO_ASSINATURA_FAILED = '[ASSINATURA LIST] DESENTRANHAMENTO ASSINATURA FAILED';

/**
 * Get Assinaturas
 */
export class GetAssinaturas implements Action
{
    readonly type = GET_ASSINATURAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinaturas Success
 */
export class GetAssinaturasSuccess implements Action
{
    readonly type = GET_ASSINATURAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assinaturas Failed
 */
export class GetAssinaturasFailed implements Action
{
    readonly type = GET_ASSINATURAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Assinaturas
 */
export class ReloadAssinaturas implements Action
{
    readonly type = RELOAD_ASSINATURAS;

    constructor()
    {
    }
}

export type AssinaturaListActionsAll
    = GetAssinaturas
    | GetAssinaturasSuccess
    | GetAssinaturasFailed
    | ReloadAssinaturas;

