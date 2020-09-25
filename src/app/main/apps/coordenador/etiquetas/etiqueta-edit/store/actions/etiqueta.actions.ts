import { Action } from '@ngrx/store';

export const CREATE_ETIQUETA = '[COORDENADOR ETIQUETA] CREATE ETIQUETA';

export const GET_ETIQUETA = '[COORDENADOR ETIQUETA] GET ETIQUETA';
export const GET_ETIQUETA_SUCCESS = '[COORDENADOR ETIQUETA] GET ETIQUETA SUCCESS';
export const GET_ETIQUETA_FAILED = '[COORDENADOR ETIQUETA] GET ETIQUETA FAILED';

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

export type EtiquetaActionsAll
    = CreateEtiqueta
    | GetEtiqueta
    | GetEtiquetaSuccess
    | GetEtiquetaFailed;
