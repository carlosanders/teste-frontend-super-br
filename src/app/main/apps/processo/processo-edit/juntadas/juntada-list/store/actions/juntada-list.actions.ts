import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[JUNTADA LIST] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[JUNTADA LIST] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[JUNTADA LIST] GET JUNTADAS FAILED';

export const RELOAD_JUNTADAS = '[JUNTADA LIST] RELOAD JUNTADAS';

export const DELETE_JUNTADA = '[JUNTADA LIST] DELETE JUNTADA';
export const DELETE_JUNTADA_SUCCESS = '[JUNTADA LIST] DELETE JUNTADA SUCCESS';
export const DELETE_JUNTADA_FAILED = '[JUNTADA LIST] DELETE JUNTADA FAILED';

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
 * Delete Juntada
 */
export class DeleteJuntada implements Action
{
    readonly type = DELETE_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Juntada Success
 */
export class DeleteJuntadaSuccess implements Action
{
    readonly type = DELETE_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Juntada Failed
 */
export class DeleteJuntadaFailed implements Action
{
    readonly type = DELETE_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type JuntadaListActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | ReloadJuntadas
    | DeleteJuntada
    | DeleteJuntadaSuccess
    | DeleteJuntadaFailed;

