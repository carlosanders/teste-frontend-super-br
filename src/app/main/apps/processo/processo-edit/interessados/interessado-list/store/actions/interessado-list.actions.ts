import {Action} from '@ngrx/store';

export const GET_INTERESSADOS = '[INTERESSADO LIST] GET INTERESSADOS';
export const GET_INTERESSADOS_SUCCESS = '[INTERESSADO LIST] GET INTERESSADOS SUCCESS';
export const GET_INTERESSADOS_FAILED = '[INTERESSADO LIST] GET INTERESSADOS FAILED';

export const RELOAD_INTERESSADOS = '[INTERESSADO LIST] RELOAD INTERESSADOS';

export const DELETE_INTERESSADO = '[INTERESSADO LIST] DELETE INTERESSADO';
export const DELETE_INTERESSADO_SUCCESS = '[INTERESSADO LIST] DELETE INTERESSADO SUCCESS';
export const DELETE_INTERESSADO_FAILED = '[INTERESSADO LIST] DELETE INTERESSADO FAILED';

/**
 * Get Interessados
 */
export class GetInteressados implements Action
{
    readonly type = GET_INTERESSADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessados Success
 */
export class GetInteressadosSuccess implements Action
{
    readonly type = GET_INTERESSADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessados Failed
 */
export class GetInteressadosFailed implements Action
{
    readonly type = GET_INTERESSADOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Interessados
 */
export class ReloadInteressados implements Action
{
    readonly type = RELOAD_INTERESSADOS;

    constructor()
    {
    }
}

/**
 * Delete Interessado
 */
export class DeleteInteressado implements Action
{
    readonly type = DELETE_INTERESSADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Interessado Success
 */
export class DeleteInteressadoSuccess implements Action
{
    readonly type = DELETE_INTERESSADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Interessado Failed
 */
export class DeleteInteressadoFailed implements Action
{
    readonly type = DELETE_INTERESSADO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type InteressadoListActionsAll
    = GetInteressados
    | GetInteressadosSuccess
    | GetInteressadosFailed
    | ReloadInteressados
    | DeleteInteressado
    | DeleteInteressadoSuccess
    | DeleteInteressadoFailed;

