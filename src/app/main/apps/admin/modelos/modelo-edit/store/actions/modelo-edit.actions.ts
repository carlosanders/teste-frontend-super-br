import {Action} from '@ngrx/store';

export const CREATE_MODELO = '[ADMIN MODELO EDIT] CREATE MODELO';
export const CREATE_MODELO_SUCCESS = '[ADMIN MODELO EDIT] CREATE MODELO SUCCESS';

export const SAVE_MODELO = '[ADMIN MODELO EDIT] SAVE MODELO';
export const SAVE_MODELO_SUCCESS = '[ADMIN MODELO EDIT] SAVE MODELO SUCCESS';
export const SAVE_MODELO_FAILED = '[ADMIN MODELO EDIT] SAVE MODELO FAILED';

export const GET_MODELO = '[ADMIN MODELO EDIT] GET MODELO';
export const GET_MODELO_SUCCESS = '[ADMIN MODELO EDIT] GET MODELO SUCCESS';
export const GET_MODELO_FAILED = '[ADMIN MODELO EDIT] GET MODELO FAILED';

/**
 * Get Modelo
 */
export class GetModelo implements Action
{
    readonly type = GET_MODELO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modelo Success
 */
export class GetModeloSuccess implements Action
{
    readonly type = GET_MODELO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Modelo Failed
 */
export class GetModeloFailed implements Action
{
    readonly type = GET_MODELO_FAILED;

    constructor(public payload: string)
    {
    }
}

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
 * Create Modelo
 */
export class CreateModelo implements Action
{
    readonly type = CREATE_MODELO;

    constructor()
    {
    }
}

/**
 * Create Modelo Success
 */
export class CreateModeloSuccess implements Action
{
    readonly type = CREATE_MODELO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type AdminModeloEditActionsAll
    = CreateModelo
    | CreateModeloSuccess
    | GetModelo
    | GetModeloSuccess
    | GetModeloFailed
    | SaveModelo
    | SaveModeloSuccess
    | SaveModeloFailed;
