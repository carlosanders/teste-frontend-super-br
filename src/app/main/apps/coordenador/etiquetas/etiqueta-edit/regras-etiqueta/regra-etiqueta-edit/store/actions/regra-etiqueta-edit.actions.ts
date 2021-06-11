import {Action} from '@ngrx/store';

export const CREATE_REGRA_ETIQUETA = '[REGRA COORDENADOR] CREATE REGRA ETIQUETA COORDENADOR ';
export const CREATE_REGRA_ETIQUETA_SUCCESS = '[REGRA COORDENADOR] CREATE REGRA ETIQUETA COORDENADOR  SUCCESS';

export const SAVE_REGRA_ETIQUETA = '[REGRA COORDENADOR] SAVE REGRA ETIQUETA COORDENADOR ';
export const SAVE_REGRA_ETIQUETA_SUCCESS = '[REGRA COORDENADOR] SAVE REGRA ETIQUETA COORDENADOR SUCCESS';
export const SAVE_REGRA_ETIQUETA_FAILED = '[REGRA COORDENADOR] SAVE REGRA ETIQUETA COORDENADOR FAILED';

export const GET_REGRA_ETIQUETA = '[REGRA COORDENADOR] GET REGRA COORDENADOR ETIQUETA';
export const GET_REGRA_ETIQUETA_SUCCESS = '[REGRA COORDENADOR] GET REGRA ETIQUETA COORDENADOR SUCCESS';
export const GET_REGRA_ETIQUETA_FAILED = '[REGRA COORDENADOR] GET REGRA ETIQUETA COORDENADOR FAILED';

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
