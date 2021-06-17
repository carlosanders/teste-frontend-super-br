import {Action} from '@ngrx/store';

export const GET_ETIQUETAS = '[ETIQUETA COORDENADOR LIST] GET ETIQUETAS';
export const GET_ETIQUETAS_SUCCESS = '[ETIQUETA COORDENADOR LIST] GET ETIQUETAS SUCCESS';
export const GET_ETIQUETAS_FAILED = '[ETIQUETA COORDENADOR LIST] GET ETIQUETAS FAILED';

export const RELOAD_ETIQUETAS = '[ETIQUETA COORDENADOR LIST] RELOAD ETIQUETAS';
export const UNLOAD_ETIQUETAS = '[ETIQUETA COORDENADOR LIST] UNLOAD ETIQUETAS';


export const DELETE_ETIQUETA = '[ETIQUETA COORDENADOR LIST] DELETE ETIQUETA';
export const DELETE_ETIQUETA_SUCCESS = '[ETIQUETA COORDENADOR LIST] DELETE ETIQUETA SUCCESS';
export const DELETE_ETIQUETA_FAILED = '[ETIQUETA COORDENADOR LIST] DELETE ETIQUETA FAILED';

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
 * Unload Etiquetas
 */
 export class UnloadEtiquetas implements Action
 {
     readonly type = UNLOAD_ETIQUETAS;

     constructor()
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
    | UnloadEtiquetas
    | ReloadEtiquetas
    | DeleteEtiqueta
    | DeleteEtiquetaSuccess
    | DeleteEtiquetaFailed;

