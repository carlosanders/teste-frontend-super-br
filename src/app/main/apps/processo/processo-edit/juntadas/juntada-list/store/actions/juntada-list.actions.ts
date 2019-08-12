import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[JUNTADA LIST] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[JUNTADA LIST] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[JUNTADA LIST] GET JUNTADAS FAILED';

export const RELOAD_JUNTADAS = '[JUNTADA LIST] RELOAD JUNTADAS';

export const DESENTRANHAMENTO_JUNTADA = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA';
export const DESENTRANHAMENTO_JUNTADA_SUCCESS = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA SUCCESS';
export const DESENTRANHAMENTO_JUNTADA_FAILED = '[JUNTADA LIST] DESENTRANHAMENTO JUNTADA FAILED';

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

export type JuntadaListActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas
    | DesentranharJuntada
    | DesentranharJuntadaSuccess
    | DesentranharJuntadaFailed;

