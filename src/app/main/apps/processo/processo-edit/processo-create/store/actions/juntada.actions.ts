import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[DADOS BASICOS STEPS] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[DADOS BASICOS STEPS] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[DADOS BASICOS STEPS] GET JUNTADAS FAILED';

export const UNLOAD_JUNTADAS = '[DADOS BASICOS STEPS] UNLOAD JUNTADAS';

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
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

export type JuntadaActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | UnloadJuntadas;
