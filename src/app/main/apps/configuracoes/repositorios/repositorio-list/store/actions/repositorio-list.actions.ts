import {Action} from '@ngrx/store';

export const GET_REPOSITORIOS = '[REPOSITORIO LIST] GET REPOSITORIOS';
export const GET_REPOSITORIOS_SUCCESS = '[REPOSITORIO LIST] GET REPOSITORIOS SUCCESS';
export const GET_REPOSITORIOS_FAILED = '[REPOSITORIO LIST] GET REPOSITORIOS FAILED';

export const RELOAD_REPOSITORIOS = '[REPOSITORIO LIST] RELOAD REPOSITORIOS';
export const UNLOAD_REPOSITORIOS = '[REPOSITORIO LIST] UNLOAD REPOSITORIOS';


export const DELETE_REPOSITORIO = '[REPOSITORIO LIST] DELETE REPOSITORIO';
export const DELETE_REPOSITORIO_SUCCESS = '[REPOSITORIO LIST] DELETE REPOSITORIO SUCCESS';
export const DELETE_REPOSITORIO_FAILED = '[REPOSITORIO LIST] DELETE REPOSITORIO FAILED';

/**
 * Get Repositorios
 */
export class GetRepositorios implements Action
{
    readonly type = GET_REPOSITORIOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorios Success
 */
export class GetRepositoriosSuccess implements Action
{
    readonly type = GET_REPOSITORIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorios Failed
 */
export class GetRepositoriosFailed implements Action
{
    readonly type = GET_REPOSITORIOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Repositorios
 */
 export class UnloadRepositorios implements Action
 {
     readonly type = UNLOAD_REPOSITORIOS;

     constructor()
     {
     }
 }

/**
 * Reload Repositorios
 */
export class ReloadRepositorios implements Action
{
    readonly type = RELOAD_REPOSITORIOS;

    constructor()
    {
    }
}

/**
 * Delete Repositorio
 */
export class DeleteRepositorio implements Action
{
    readonly type = DELETE_REPOSITORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Repositorio Success
 */
export class DeleteRepositorioSuccess implements Action
{
    readonly type = DELETE_REPOSITORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Repositorio Failed
 */
export class DeleteRepositorioFailed implements Action
{
    readonly type = DELETE_REPOSITORIO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RepositorioListActionsAll
    = GetRepositorios
    | GetRepositoriosSuccess
    | GetRepositoriosFailed
    | UnloadRepositorios
    | ReloadRepositorios
    | DeleteRepositorio
    | DeleteRepositorioSuccess
    | DeleteRepositorioFailed;

