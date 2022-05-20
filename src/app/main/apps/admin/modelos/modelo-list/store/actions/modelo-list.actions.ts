import {Action} from '@ngrx/store';

export const GET_MODELOS = '[ADMIN MODELO LIST] GET MODELOS';
export const GET_MODELOS_SUCCESS = '[ADMIN MODELO LIST] GET MODELOS SUCCESS';
export const GET_MODELOS_FAILED = '[ADMIN MODELO LIST] GET MODELOS FAILED';

export const RELOAD_MODELOS = '[ADMIN MODELO LIST] RELOAD MODELOS';
export const UNLOAD_MODELOS = '[ADMIN MODELO LIST] UNLOAD MODELOS';


export const DELETE_MODELO = '[ADMIN MODELO LIST] DELETE MODELO';
export const DELETE_MODELO_SUCCESS = '[ADMIN MODELO LIST] DELETE MODELO SUCCESS';
export const DELETE_MODELO_FAILED = '[ADMIN MODELO LIST] DELETE MODELO FAILED';

/**
 * Get Modelos
 */
export class GetModelos implements Action
{
    readonly type = GET_MODELOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modelos Success
 */
export class GetModelosSuccess implements Action
{
    readonly type = GET_MODELOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modelos Failed
 */
export class GetModelosFailed implements Action
{
    readonly type = GET_MODELOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Modelos
 */
 export class UnloadModelos implements Action
 {
     readonly type = UNLOAD_MODELOS;

     constructor()
     {
     }
 }

/**
 * Reload Modelos
 */
export class ReloadModelos implements Action
{
    readonly type = RELOAD_MODELOS;

    constructor()
    {
    }
}

/**
 * Delete Modelo
 */
export class DeleteModelo implements Action
{
    readonly type = DELETE_MODELO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Modelo Success
 */
export class DeleteModeloSuccess implements Action
{
    readonly type = DELETE_MODELO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Modelo Failed
 */
export class DeleteModeloFailed implements Action
{
    readonly type = DELETE_MODELO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModeloListActionsAll
    = GetModelos
    | GetModelosSuccess
    | GetModelosFailed
    | UnloadModelos
    | ReloadModelos
    | DeleteModelo
    | DeleteModeloSuccess
    | DeleteModeloFailed;

