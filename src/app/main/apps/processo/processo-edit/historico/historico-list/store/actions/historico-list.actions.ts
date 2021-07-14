import {Action} from '@ngrx/store';

export const GET_HISTORICOS = '[HISTORICO LIST] GET HISTORICOS';
export const GET_HISTORICOS_SUCCESS = '[HISTORICO LIST] GET HISTORICOS SUCCESS';
export const GET_HISTORICOS_FAILED = '[HISTORICO LIST] GET HISTORICOS FAILED';

export const RELOAD_HISTORICOS = '[HISTORICO LIST] RELOAD HISTORICOS';
export const UNLOAD_HISTORICOS = '[HISTORICO LIST] UNLOAD HISTORICOS';

/**
 * Get Historicos
 */
export class GetHistoricos implements Action
{
    readonly type = GET_HISTORICOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Historicos Success
 */
export class GetHistoricosSuccess implements Action
{
    readonly type = GET_HISTORICOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Historicos Failed
 */
export class GetHistoricosFailed implements Action
{
    readonly type = GET_HISTORICOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Historicos
 */
export class ReloadHistoricos implements Action
{
    readonly type = RELOAD_HISTORICOS;

    constructor()
    {
    }
}

/**
 * Unload Historicos
 */
export class UnloadHistoricos implements Action
{
    readonly type = UNLOAD_HISTORICOS;

    constructor()
    {
    }
}

export type HistoricoListActionsAll
    = GetHistoricos
    | GetHistoricosSuccess
    | GetHistoricosFailed
    | ReloadHistoricos
    | UnloadHistoricos;

