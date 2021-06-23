import {Action} from '@ngrx/store';

export const GET_MODELOS = '[COORDENADOR MODELO LIST] GET MODELOS';
export const GET_MODELOS_SUCCESS = '[COORDENADOR MODELO LIST] GET MODELOS SUCCESS';
export const GET_MODELOS_FAILED = '[COORDENADOR MODELO LIST] GET MODELOS FAILED';

export const RELOAD_MODELOS = '[COORDENADOR MODELO LIST] RELOAD MODELOS';
export const UNLOAD_MODELOS = '[COORDENADOR MODELO LIST] UNLOAD MODELOS';


export const DELETE_MODELO = '[COORDENADOR MODELO LIST] DELETE MODELO';
export const DELETE_MODELO_SUCCESS = '[COORDENADOR MODELO LIST] DELETE MODELO SUCCESS';
export const DELETE_MODELO_FAILED = '[COORDENADOR MODELO LIST] DELETE MODELO FAILED';

export const SAVE_MODELO = '[COORDENADOR MODELO ] SAVE MODELO';
export const SAVE_MODELO_SUCCESS = '[COORDENADOR MODELO ] SAVE MODELO SUCCESS';
export const SAVE_MODELO_FAILED = '[COORDENADOR MODELO ] SAVE MODELO FAILED';

/**
 * Save Modelo
 */
export class SaveModelo implements Action
{
    readonly type = SAVE_MODELO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Modelo Success
 */
export class SaveModeloSuccess implements Action
{
    readonly type = SAVE_MODELO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Modelo Failed
 */
export class SaveModeloFailed implements Action
{
    readonly type = SAVE_MODELO_FAILED;

    constructor(public payload: any)
    {
    }
}

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

export type ModelosListActionsAll
    = GetModelos
    | GetModelosSuccess
    | GetModelosFailed
    | SaveModelo
    | SaveModeloSuccess
    | SaveModeloFailed
    | UnloadModelos
    | ReloadModelos
    | DeleteModelo
    | DeleteModeloSuccess
    | DeleteModeloFailed;

