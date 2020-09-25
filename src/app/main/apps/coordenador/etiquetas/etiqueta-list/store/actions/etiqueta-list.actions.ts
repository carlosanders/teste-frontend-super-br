import { Action } from '@ngrx/store';

export const GET_ETIQUETAS = '[COORDENADOR ETIQUETA LIST] GET ETIQUETAS';
export const GET_ETIQUETAS_SUCCESS = '[COORDENADOR ETIQUETA LIST] GET ETIQUETAS SUCCESS';
export const GET_ETIQUETAS_FAILED = '[COORDENADOR ETIQUETA LIST] GET ETIQUETAS FAILED';

export const RELOAD_ETIQUETAS = '[COORDENADOR ETIQUETA LIST] RELOAD ETIQUETAS';

export const DELETE_ETIQUETA = '[COORDENADOR ETIQUETA LIST] DELETE ETIQUETA';
export const DELETE_ETIQUETA_SUCCESS = '[COORDENADOR ETIQUETA LIST] DELETE ETIQUETA SUCCESS';
export const DELETE_ETIQUETA_FAILED = '[COORDENADOR ETIQUETA LIST] DELETE ETIQUETA FAILED';

/**
 * Get Etiquetas
 */
export class GetEtiquetas implements Action
{
    readonly type = GET_ETIQUETAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Etiquetas Success
 */
export class GetEtiquetasSuccess implements Action
{
    readonly type = GET_ETIQUETAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Etiquetas Failed
 */
export class GetEtiquetasFailed implements Action
{
    readonly type = GET_ETIQUETAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Etiquetas
 */
export class ReloadEtiquetas implements Action
{
    readonly type = RELOAD_ETIQUETAS;

    constructor()
    {
    }
}

/**
 * Delete Etiqueta
 */
export class DeleteEtiqueta implements Action
{
    readonly type = DELETE_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Etiqueta Success
 */
export class DeleteEtiquetaSuccess implements Action
{
    readonly type = DELETE_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Etiqueta Failed
 */
export class DeleteEtiquetaFailed implements Action
{
    readonly type = DELETE_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type EtiquetaListActionsAll
    = GetEtiquetas
    | GetEtiquetasSuccess
    | GetEtiquetasFailed
    | ReloadEtiquetas
    | DeleteEtiqueta
    | DeleteEtiquetaSuccess
    | DeleteEtiquetaFailed;

