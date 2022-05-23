import { Action } from '@ngrx/store';
import {ConfigModuloModel} from '../../../../../../../../@cdk/models';

export const CREATE_CONFIG_MODULE = '[ADMIN CONFIG_MODULE EDIT] CREATE CONFIG_MODULE';
export const CREATE_CONFIG_MODULE_SUCCESS = '[ADMIN CONFIG_MODULE EDIT] CREATE CONFIG_MODULE SUCCESS';

export const SAVE_CONFIG_MODULE = '[ADMIN CONFIG_MODULE EDIT] SAVE CONFIG_MODULE';
export const SAVE_CONFIG_MODULE_SUCCESS = '[ADMIN CONFIG_MODULE EDIT] SAVE CONFIG_MODULE SUCCESS';
export const SAVE_CONFIG_MODULE_FAILED = '[ADMIN CONFIG_MODULE EDIT] SAVE CONFIG_MODULE FAILED';

export const UPDATE_CONFIG_MODULE = '[ADMIN CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE';
export const UPDATE_CONFIG_MODULE_SUCCESS = '[ADMIN CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE SUCCESS';
export const UPDATE_CONFIG_MODULE_FAILED = '[ADMIN CONFIG_MODULE EDIT] UPDATE CONFIG_MODULE FAILED';

export const GET_CONFIG_MODULE = '[ADMIN CONFIG_MODULE EDIT] GET CONFIG_MODULE';
export const GET_CONFIG_MODULE_SUCCESS = '[ADMIN CONFIG_MODULE EDIT] GET CONFIG_MODULE SUCCESS';
export const GET_CONFIG_MODULE_FAILED = '[ADMIN CONFIG_MODULE EDIT] GET CONFIG_MODULE FAILED';

/**
 * Get ConfigModuloModel
 */
export class GetConfigModule implements Action
{
    readonly type = GET_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModuloModel Success
 */
export class GetConfigModuleSuccess implements Action
{
    readonly type = GET_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ConfigModuloModel Failed
 */
export class GetConfigModuleFailed implements Action
{
    readonly type = GET_CONFIG_MODULE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ConfigModuloModel
 */
export class SaveConfigModule implements Action
{
    readonly type = SAVE_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModuloModel
 */
export class UpdateConfigModule implements Action
{
    readonly type = UPDATE_CONFIG_MODULE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ConfigModuloModel Success
 */
export class SaveConfigModuleSuccess implements Action
{
    readonly type = SAVE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ConfigModuloModel Failed
 */
export class SaveConfigModuleFailed implements Action
{
    readonly type = SAVE_CONFIG_MODULE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModuloModel Success
 */
export class UpdateConfigModuleSuccess implements Action
{
    readonly type = UPDATE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ConfigModuloModel Failed
 */
export class UpdateConfigModuleFailed implements Action
{
    readonly type = UPDATE_CONFIG_MODULE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create ConfigModuloModel
 */
export class CreateConfigModule implements Action
{
    readonly type = CREATE_CONFIG_MODULE;

    constructor()
    {
    }
}

/**
 * Create ConfigModuloModel Success
 */
export class CreateConfigModuleSuccess implements Action
{
    readonly type = CREATE_CONFIG_MODULE_SUCCESS;

    constructor(public payload: any)
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
    | UpdateConfigModuleFailed;
