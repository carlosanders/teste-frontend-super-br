import { Action } from '@ngrx/store';

export const CREATE_REGRA_ETIQUETA = '[COORDENADOR REGRA ETIQUETA] CREATE REGRA ETIQUETA';
export const CREATE_REGRA_ETIQUETA_SUCCESS = '[COORDENADOR REGRA ETIQUETA] CREATE REGRA ETIQUETA SUCCESS';

export const SAVE_REGRA_ETIQUETA = '[COORDENADOR REGRA ETIQUETA] SAVE REGRA ETIQUETA';
export const SAVE_REGRA_ETIQUETA_SUCCESS = '[COORDENADOR REGRA ETIQUETA] SAVE REGRA ETIQUETA SUCCESS';
export const SAVE_REGRA_ETIQUETA_FAILED = '[COORDENADOR REGRA ETIQUETA] SAVE REGRA ETIQUETA FAILED';

export const GET_REGRA_ETIQUETA = '[COORDENADOR REGRA ETIQUETA] GET REGRA ETIQUETA';
export const GET_REGRA_ETIQUETA_SUCCESS = '[COORDENADOR REGRA ETIQUETA] GET REGRA ETIQUETA SUCCESS';
export const GET_REGRA_ETIQUETA_FAILED = '[COORDENADOR REGRA ETIQUETA] GET REGRA ETIQUETA FAILED';

/**
 * Get RegraEtiqueta
 */
export class GetRegraEtiqueta implements Action
{
    readonly type = GET_REGRA_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RegraEtiqueta Success
 */
export class GetRegraEtiquetaSuccess implements Action
{
    readonly type = GET_REGRA_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RegraEtiqueta Failed
 */
export class GetRegraEtiquetaFailed implements Action
{
    readonly type = GET_REGRA_ETIQUETA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save RegraEtiqueta
 */
export class SaveRegraEtiqueta implements Action
{
    readonly type = SAVE_REGRA_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RegraEtiqueta Success
 */
export class SaveRegraEtiquetaSuccess implements Action
{
    readonly type = SAVE_REGRA_ETIQUETA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save RegraEtiqueta Failed
 */
export class SaveRegraEtiquetaFailed implements Action
{
    readonly type = SAVE_REGRA_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create RegraEtiqueta
 */
export class CreateRegraEtiqueta implements Action
{
    readonly type = CREATE_REGRA_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Create RegraEtiqueta Success
 */
export class CreateRegraEtiquetaSuccess implements Action
{
    readonly type = CREATE_REGRA_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type RegraEtiquetaEditActionsAll
    = CreateRegraEtiqueta
    | CreateRegraEtiquetaSuccess
    | GetRegraEtiqueta
    | GetRegraEtiquetaSuccess
    | GetRegraEtiquetaFailed
    | SaveRegraEtiqueta
    | SaveRegraEtiquetaSuccess
    | SaveRegraEtiquetaFailed;
