import {Action} from '@ngrx/store';

export const ENVIA_EMAIL_DOCUMENTO = '[JUNTADA ENVIA EMAIL] ENVIA EMAIL';
export const ENVIA_EMAIL_DOCUMENTO_SUCCESS = '[JUNTADA ENVIA EMAIL] ENVIA EMAIL SUCCESS';
export const ENVIA_EMAIL_DOCUMENTO_FAILED = '[JUNTADA ENVIA EMAIL] ENVIA EMAIL FAILED';

export const GET_JUNTADA = '[JUNTADA ENVIA EMAIL] GET JUNTADA ENVIA EMAIL';
export const GET_JUNTADA_SUCCESS = '[JUNTADA ENVIA EMAIL] GET JUNTADA ENVIA EMAIL SUCCESS';
export const GET_JUNTADA_FAILED = '[JUNTADA ENVIA EMAIL] GET JUNTADA ENVIA EMAIL FAILED';

/**
 * Envia Email
 */
export class EnviaEmail implements Action
{
    readonly type = ENVIA_EMAIL_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Envia Email Success
 */
export class EnviaEmailSuccess implements Action
{
    readonly type = ENVIA_EMAIL_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Envia Email Failed
 */
export class EnviaEmailFailed implements Action
{
    readonly type = ENVIA_EMAIL_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor()
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

export type EnviaEmailActionsAll
    = EnviaEmail
    | EnviaEmailSuccess
    | EnviaEmailFailed
    | GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed;
