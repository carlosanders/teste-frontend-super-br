import { Action } from '@ngrx/store';

export const GET_MODELOS = '[MODELO LIST] GET MODELOS';
export const GET_MODELOS_SUCCESS = '[MODELO LIST] GET MODELOS SUCCESS';
export const GET_MODELOS_FAILED = '[MODELO LIST] GET MODELOS FAILED';

export const RELOAD_MODELOS = '[MODELO LIST] RELOAD MODELOS';

export const DELETE_MODELO = '[MODELO LIST] DELETE MODELO';
export const DELETE_MODELO_SUCCESS = '[MODELO LIST] DELETE MODELO SUCCESS';
export const DELETE_MODELO_FAILED = '[MODELO LIST] DELETE MODELO FAILED';

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
    | ReloadModelos
    | DeleteModelo
    | DeleteModeloSuccess
    | DeleteModeloFailed;

