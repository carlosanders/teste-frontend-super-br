import { Action } from '@ngrx/store';

export const CREATE_CONFIG_MODULE = '[CONFIG_MODULE EDIT] CREATE CONFIG_MODULE';
export const CREATE_CONFIG_MODULE_SUCCESS = '[CONFIG_MODULE EDIT] CREATE CONFIG_MODULE SUCCESS';

export const SAVE_CONFIG_MODULE = '[CONFIG_MODULE EDIT] SAVE CONFIG_MODULE';
export const SAVE_CONFIG_MODULE_SUCCESS = '[CONFIG_MODULE EDIT] SAVE CONFIG_MODULE SUCCESS';
export const SAVE_CONFIG_MODULE_FAILED = '[CONFIG_MODULE EDIT] SAVE CONFIG_MODULE FAILED';

export const UPDATE_CONFIG_MODULE = '[CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE';
export const UPDATE_CONFIG_MODULE_SUCCESS = '[CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE SUCCESS';
export const UPDATE_CONFIG_MODULE_FAILED = '[CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE FAILED';

export const GET_CONFIG_MODULE = '[CONFIG_MODULE EDIT] GET CONFIG_MODULE';
export const GET_CONFIG_MODULE_SUCCESS = '[CONFIG_MODULE EDIT] GET CONFIG_MODULE SUCCESS';
export const GET_CONFIG_MODULE_FAILED = '[CONFIG_MODULE EDIT] GET CONFIG_MODULE FAILED';

export const CLEAN_ERRORS = '[ADMIN CONFIG_MODULE EDIT] CLEAN ERRORS';

/**
 * Get ConfigModulo
 */
export class GetConfigModule implements Action
{
    readonly type = GET_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModulo Success
 */
export class GetConfigModuleSuccess implements Action
{
    readonly type = GET_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModulo Failed
 */
export class GetConfigModuleFailed implements Action
{
    readonly type = GET_CONFIG_MODULE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ConfigModulo
 */
export class SaveConfigModule implements Action
{
    readonly type = SAVE_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModulo
 */
export class UpdateConfigModule implements Action
{
    readonly type = UPDATE_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ConfigModulo Success
 */
export class SaveConfigModuleSuccess implements Action
{
    readonly type = SAVE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ConfigModulo Failed
 */
export class SaveConfigModuleFailed implements Action
{
    readonly type = SAVE_CONFIG_MODULE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModulo Success
 */
export class UpdateConfigModuleSuccess implements Action
{
    readonly type = UPDATE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModulo Failed
 */
export class UpdateConfigModuleFailed implements Action
{
    readonly type = UPDATE_CONFIG_MODULE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create ConfigModulo
 */
export class CreateConfigModule implements Action
{
    readonly type = CREATE_CONFIG_MODULE;

    constructor()
    {
    }
}

/**
 * Create ConfigModulo Success
 */
export class CreateConfigModuleSuccess implements Action
{
    readonly type = CREATE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Clean ConfigModulo
 */
export class CleanErrors implements Action
{
    readonly type = CLEAN_ERRORS;

    constructor()
    {
    }
}

export type ConfigModuleEditActionsAll
    = CreateConfigModule
    | CreateConfigModuleSuccess
    | GetConfigModule
    | GetConfigModuleSuccess
    | GetConfigModuleFailed
    | SaveConfigModule
    | SaveConfigModuleSuccess
    | SaveConfigModuleFailed
    | UpdateConfigModule
    | UpdateConfigModuleSuccess
    | UpdateConfigModuleFailed
    | CleanErrors;
