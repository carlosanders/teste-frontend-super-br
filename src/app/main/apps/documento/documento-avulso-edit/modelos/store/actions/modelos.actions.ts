import {Action} from '@ngrx/store';

export const GET_MODELOS = '[DOCUMENTO AVULSO EDIT] GET MODELOS';
export const GET_MODELOS_SUCCESS = '[DOCUMENTO AVULSO EDIT] GET MODELOS SUCCESS';
export const GET_MODELOS_FAILED = '[DOCUMENTO AVULSO EDIT] GET MODELOS FAILED';

export const UNLOAD_MODELOS = '[DOCUMENTO AVULSO EDIT] UNLOAD MODELOS';

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

export type ModelosActionsAll
    = GetModelos
    | GetModelosSuccess
    | GetModelosFailed
    | UnloadModelos;
