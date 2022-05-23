import { Action } from '@ngrx/store';

export const GET_CONFIG_MODULO = '[ LIST] GET CONFIG_MODULO';
export const GET_CONFIG_MODULO_SUCCESS = '[ LIST] GET CONFIG_MODULO SUCCESS';
export const GET_CONFIG_MODULO_FAILED = '[ LIST] GET CONFIG_MODULO FAILED';

export const RELOAD_CONFIG_MODULO = '[ LIST] RELOAD CONFIG_MODULO';

export const DELETE_CONFIG_MODULO = '[ LIST] DELETE CONFIG_MODULO';
export const DELETE_CONFIG_MODULO_SUCCESS = '[ LIST] DELETE CONFIG_MODULO SUCCESS';
export const DELETE_CONFIG_MODULO_FAILED = '[ LIST] DELETE CONFIG_MODULO FAILED';

/**
 * Get ConfigModulo
 */
export class GetConfigModule implements Action
{
    readonly type = GET_CONFIG_MODULO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModulo Success
 */
export class GetConfigModuleSuccess implements Action
{
    readonly type = GET_CONFIG_MODULO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModulo Failed
 */
export class GetConfigModuleFailed implements Action
{
    readonly type = GET_CONFIG_MODULO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload ConfigModulo
 */
export class ReloadConfigModule implements Action
{
    readonly type = RELOAD_CONFIG_MODULO;

    constructor()
    {
    }
}

/**
 * Delete ConfigModulo
 */
export class DeleteConfigModule implements Action
{
    readonly type = DELETE_CONFIG_MODULO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ConfigModulo Success
 */
export class DeleteConfigModuleSuccess implements Action
{
    readonly type = DELETE_CONFIG_MODULO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete ConfigModulo Failed
 */
export class DeleteConfigModuleFailed implements Action
{
    readonly type = DELETE_CONFIG_MODULO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ConfigModuleListActionsAll
    = GetConfigModule
    | GetConfigModuleSuccess
    | GetConfigModuleFailed
    | ReloadConfigModule
    | DeleteConfigModule
    | DeleteConfigModuleSuccess
    | DeleteConfigModuleFailed;

