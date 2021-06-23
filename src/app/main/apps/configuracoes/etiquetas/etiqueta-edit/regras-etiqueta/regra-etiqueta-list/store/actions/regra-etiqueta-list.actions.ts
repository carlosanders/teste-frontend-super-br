import {Action} from '@ngrx/store';

export const GET_REGRAS_ETIQUETA = '[REGRA ETIQUETA LIST] GET REGRAS ETIQUETA';
export const GET_REGRAS_ETIQUETA_SUCCESS = '[REGRA ETIQUETA LIST] GET REGRAS ETIQUETA SUCCESS';
export const GET_REGRAS_ETIQUETA_FAILED = '[REGRA ETIQUETA LIST] GET REGRAS ETIQUETA FAILED';

export const RELOAD_REGRAS_ETIQUETA = '[REGRA ETIQUETA LIST] RELOAD REGRAS ETIQUETA';

export const UNLOAD_REGRAS_ETIQUETA = '[REGRA ETIQUETA LIST] UNLOAD REGRAS ETIQUETA';

export const DELETE_REGRA_ETIQUETA = '[REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA';
export const DELETE_REGRA_ETIQUETA_SUCCESS = '[REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA SUCCESS';
export const DELETE_REGRA_ETIQUETA_FAILED = '[REGRA ETIQUETA LIST] DELETE REGRA ETIQUETA FAILED';

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
 * Unload RegrasEtiqueta
 */
export class UnloadRegrasEtiqueta implements Action
{
    readonly type = UNLOAD_REGRAS_ETIQUETA;

    constructor()
    {
    }
}

/**
 * Delete Regra
 */
export class DeleteRegraEtiqueta implements Action
{
    readonly type = DELETE_REGRA_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Regra Success
 */
export class DeleteRegraEtiquetaSuccess implements Action
{
    readonly type = DELETE_REGRA_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Regra Failed
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
    | UnloadRegrasEtiqueta
    | DeleteRegraEtiqueta
    | DeleteRegraEtiquetaSuccess
    | DeleteRegraEtiquetaFailed;
