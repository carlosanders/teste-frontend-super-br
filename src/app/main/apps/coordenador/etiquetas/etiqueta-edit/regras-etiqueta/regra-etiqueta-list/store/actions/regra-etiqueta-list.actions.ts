import { Action } from '@ngrx/store';

export const GET_REGRAS_ETIQUETA = '[COORDENADOR REGRA ETIQUETA LIST] GET  REGRA ETIQUETA';
export const GET_REGRAS_ETIQUETA_SUCCESS = '[COORDENADOR REGRA ETIQUETA LIST] GET REGRAS SUCCESS';
export const GET_REGRAS_ETIQUETA_FAILED = '[COORDENADOR REGRA ETIQUETA LIST] GET REGRAS FAILED';

export const RELOAD_REGRAS_ETIQUETA = '[COORDENADOR REGRA ETIQUETA LIST] RELOAD  REGRA ETIQUETA';

export const DELETE_REGRA_ETIQUETA = '[COORDENADOR REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA';
export const DELETE_REGRA_ETIQUETA_SUCCESS = '[COORDENADOR REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA SUCCESS';
export const DELETE_REGRA_ETIQUETA_FAILED = '[COORDENADOR REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA FAILED';

/**
 * Get RegrasEtiqueta
 */
export class GetRegrasEtiqueta implements Action
{
    readonly type = GET_REGRAS_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RegrasEtiqueta Success
 */
export class GetRegrasEtiquetaSuccess implements Action
{
    readonly type = GET_REGRAS_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RegrasEtiqueta Failed
 */
export class GetRegrasEtiquetaFailed implements Action
{
    readonly type = GET_REGRAS_ETIQUETA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload RegrasEtiqueta
 */
export class ReloadRegrasEtiqueta implements Action
{
    readonly type = RELOAD_REGRAS_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Delete RegraEtiqueta
 */
export class DeleteRegraEtiqueta implements Action
{
    readonly type = DELETE_REGRA_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete RegraEtiqueta Success
 */
export class DeleteRegraEtiquetaSuccess implements Action
{
    readonly type = DELETE_REGRA_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete RegraEtiqueta Failed
 */
export class DeleteRegraEtiquetaFailed implements Action
{
    readonly type = DELETE_REGRA_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RegraEtiquetaListActionsAll
    = GetRegrasEtiqueta
    | GetRegrasEtiquetaSuccess
    | GetRegrasEtiquetaFailed
    | ReloadRegrasEtiqueta
    | DeleteRegraEtiqueta
    | DeleteRegraEtiquetaSuccess
    | DeleteRegraEtiquetaFailed;

