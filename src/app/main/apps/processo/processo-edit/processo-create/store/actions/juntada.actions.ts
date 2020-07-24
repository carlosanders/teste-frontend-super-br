import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[PROCESSO JUNTADA] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO JUNTADA] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO JUNTADA] GET JUNTADAS FAILED';

export const RELOAD_JUNTADAS = '[PROCESSO JUNTADA] RELOAD JUNTADAS';

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

export type JuntadaListActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas;

