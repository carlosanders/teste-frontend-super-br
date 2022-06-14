import { Action } from '@ngrx/store';

export const GET_MODULO = '[ LIST] GET MODULO';
export const GET_MODULO_SUCCESS = '[ LIST] GET MODULO SUCCESS';
export const GET_MODULO_FAILED = '[ LIST] GET MODULO FAILED';

export const RELOAD_MODULO = '[ LIST] RELOAD MODULO';

export const DELETE_MODULO = '[ LIST] DELETE MODULO';
export const DELETE_MODULO_SUCCESS = '[ LIST] DELETE MODULO SUCCESS';
export const DELETE_MODULO_FAILED = '[ LIST] DELETE MODULO FAILED';

/**
 * Get Modulo
 */
export class GetModulo implements Action
{
    readonly type = GET_MODULO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modulo Success
 */
export class GetModuloSuccess implements Action
{
    readonly type = GET_MODULO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modulo Failed
 */
export class GetModuloFailed implements Action
{
    readonly type = GET_MODULO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Modulo
 */
export class ReloadModulo implements Action
{
    readonly type = RELOAD_MODULO;

    constructor()
    {
    }
}

/**
 * Delete Modulo
 */
export class DeleteModulo implements Action
{
    readonly type = DELETE_MODULO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Modulo Success
 */
export class DeleteModuloSuccess implements Action
{
    readonly type = DELETE_MODULO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Modulo Failed
 */
export class DeleteModuloFailed implements Action
{
    readonly type = DELETE_MODULO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModuloListActionsAll
    = GetModulo
    | GetModuloSuccess
    | GetModuloFailed
    | ReloadModulo
    | DeleteModulo
    | DeleteModuloSuccess
    | DeleteModuloFailed;

