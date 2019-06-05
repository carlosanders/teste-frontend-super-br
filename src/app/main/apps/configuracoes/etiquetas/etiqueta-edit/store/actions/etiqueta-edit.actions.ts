import { Action } from '@ngrx/store';

export const CREATE_ETIQUETA = '[ETIQUETA] CREATE ETIQUETA';
export const CREATE_ETIQUETA_SUCCESS = '[ETIQUETA] CREATE ETIQUETA SUCCESS';

export const SAVE_ETIQUETA = '[ETIQUETA] SAVE ETIQUETA';
export const SAVE_ETIQUETA_SUCCESS = '[ETIQUETA] SAVE ETIQUETA SUCCESS';
export const SAVE_ETIQUETA_FAILED = '[ETIQUETA] SAVE ETIQUETA FAILED';

export const GET_ETIQUETA = '[ETIQUETA] GET ETIQUETA';
export const GET_ETIQUETA_SUCCESS = '[ETIQUETA] GET ETIQUETA SUCCESS';
export const GET_ETIQUETA_FAILED = '[ETIQUETA] GET ETIQUETA FAILED';

/**
 * Get Etiqueta
 */
export class GetEtiqueta implements Action
{
    readonly type = GET_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Etiqueta Success
 */
export class GetEtiquetaSuccess implements Action
{
    readonly type = GET_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Etiqueta Failed
 */
export class GetEtiquetaFailed implements Action
{
    readonly type = GET_ETIQUETA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Etiqueta
 */
export class SaveEtiqueta implements Action
{
    readonly type = SAVE_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Etiqueta Success
 */
export class SaveEtiquetaSuccess implements Action
{
    readonly type = SAVE_ETIQUETA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Etiqueta Failed
 */
export class SaveEtiquetaFailed implements Action
{
    readonly type = SAVE_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Etiqueta
 */
export class CreateEtiqueta implements Action
{
    readonly type = CREATE_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Create Etiqueta Success
 */
export class CreateEtiquetaSuccess implements Action
{
    readonly type = CREATE_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type EtiquetaEditActionsAll
    = CreateEtiqueta
    | CreateEtiquetaSuccess
    | GetEtiqueta
    | GetEtiquetaSuccess
    | GetEtiquetaFailed
    | SaveEtiqueta
    | SaveEtiquetaSuccess
    | SaveEtiquetaFailed;
