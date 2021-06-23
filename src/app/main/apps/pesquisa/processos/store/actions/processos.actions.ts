import {Action} from '@ngrx/store';

export const GET_PROCESSOS = '[PROCESSO LIST] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[PROCESSO LIST] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[PROCESSO LIST] GET PROCESSOS FAILED';

export const RELOAD_PROCESSOS = '[PROCESSO LIST] RELOAD PROCESSOS';

/**
 * Get Processos
 */
export class GetProcessos implements Action
{
    readonly type = GET_PROCESSOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processos Success
 */
export class GetProcessosSuccess implements Action
{
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processos Failed
 */
export class GetProcessosFailed implements Action
{
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Processos
 */
export class ReloadProcessos implements Action
{
    readonly type = RELOAD_PROCESSOS;

    constructor()
    {
    }
}

export type ProcessosActionsAll
    = GetProcessos
    | GetProcessosSuccess
    | GetProcessosFailed
    | ReloadProcessos;

