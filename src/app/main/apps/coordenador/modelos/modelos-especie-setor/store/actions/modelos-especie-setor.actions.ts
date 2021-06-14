import {Action} from '@ngrx/store';

export const GET_MODELO = '[COORDENADOR MODELOS ESPECIE SETOR] GET MODELO';
export const GET_MODELO_SUCCESS = '[COORDENADOR MODELOS ESPECIE SETOR] GET MODELO SUCCESS';
export const GET_MODELO_FAILED = '[COORDENADOR MODELOS ESPECIE SETOR] GET MODELO FAILED';

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

export type ModelosEspecieSetorActionsAll
    = GetModelo
    | GetModeloSuccess
    | GetModeloFailed;
