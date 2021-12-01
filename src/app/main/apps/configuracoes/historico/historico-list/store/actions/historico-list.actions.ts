import {Action} from '@ngrx/store';

export const GET_HISTORICO_CONFIG = '[HISTORICO CONFIG LIST] GET HISTORICO CONFIG';
export const GET_HISTORICO_CONFIG_SUCCESS = '[HISTORICO CONFIG LIST] GET HISTORICO CONFIG SUCCESS';
export const GET_HISTORICO_CONFIG_FAILED = '[HISTORICO CONFIG LIST] GET HISTORICO CONFIG FAILED';

export const RELOAD_HISTORICO_CONFIG = '[HISTORICO CONFIG LIST] RELOAD HISTORICO CONFIG';
export const UNLOAD_HISTORICO_CONFIG = '[HISTORICO CONFIG LIST] UNLOAD HISTORICO CONFIG';

/**
 * Get Historico
 */
export class GetHistoricoConfig implements Action
{
    readonly type = GET_HISTORICO_CONFIG;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Historico Success
 */
export class GetHistoricoConfigSuccess implements Action
{
    readonly type = GET_HISTORICO_CONFIG_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Historico Failed
 */
export class GetHistoricoConfigFailed implements Action
{
    readonly type = GET_HISTORICO_CONFIG_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Historico
 */
 export class UnloadHistoricoConfig implements Action
 {
     readonly type = UNLOAD_HISTORICO_CONFIG;

     constructor()
     {
     }
 }

/**
 * Reload Historico
 */
export class ReloadHistoricoConfig implements Action
{
    readonly type = RELOAD_HISTORICO_CONFIG;

    constructor()
    {
    }
}

export type HistoricoConfigListActionsAll
    = GetHistoricoConfig
    | GetHistoricoConfigSuccess
    | GetHistoricoConfigFailed
    | UnloadHistoricoConfig
    | ReloadHistoricoConfig;

