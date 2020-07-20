import { Action } from '@ngrx/store';

export const GET_ASSUNTOS = '[ASSUNTO LIST] GET ASSUNTOS';
export const GET_ASSUNTOS_SUCCESS = '[ASSUNTO LIST] GET ASSUNTOS SUCCESS';
export const GET_ASSUNTOS_FAILED = '[ASSUNTO LIST] GET ASSUNTOS FAILED';

export const RELOAD_ASSUNTOS = '[ASSUNTO LIST] RELOAD ASSUNTOS';

/**
 * Get Assuntos
 */
export class GetAssuntos implements Action
{
    readonly type = GET_ASSUNTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assuntos Success
 */
export class GetAssuntosSuccess implements Action
{
    readonly type = GET_ASSUNTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Assuntos Failed
 */
export class GetAssuntosFailed implements Action
{
    readonly type = GET_ASSUNTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Assuntos
 */
export class ReloadAssuntos implements Action
{
    readonly type = RELOAD_ASSUNTOS;

    constructor()
    {
    }
}


export type AssuntoListActionsAll
    = GetAssuntos
    | GetAssuntosSuccess
    | GetAssuntosFailed
    | ReloadAssuntos;


