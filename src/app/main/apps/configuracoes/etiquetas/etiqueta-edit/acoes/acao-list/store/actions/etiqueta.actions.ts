import {Action} from '@ngrx/store';

export const GET_ETIQUETA = '[ACAO LIST ETIQUETA] GET ETIQUETA';
export const GET_ETIQUETA_SUCCESS = '[ACAO LIST ETIQUETA] GET ETIQUETA SUCCESS';
export const GET_ETIQUETA_FAILED = '[ACAO LIST ETIQUETA] GET ETIQUETA FAILED';


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
    = GetEtiqueta
    | GetEtiquetaSuccess
    | GetEtiquetaFailed;
