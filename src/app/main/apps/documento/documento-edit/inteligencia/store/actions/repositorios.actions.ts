import {Action} from '@ngrx/store';

export const GET_REPOSITORIOS = '[DOCUMENTO EDIT] GET REPOSITORIOS';
export const GET_REPOSITORIOS_SUCCESS = '[DOCUMENTO EDIT] GET REPOSITORIOS SUCCESS';
export const GET_REPOSITORIOS_FAILED = '[DOCUMENTO EDIT] GET REPOSITORIOS FAILED';

export const SET_QUERY_REPOSITORIOS = '[DOCUMENTO EDIT] SET QUERY REPOSITORIOS';

export const UNLOAD_REPOSITORIOS = '[DOCUMENTO EDIT] UNLOAD REPOSITORIOS';

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
 * Set Query Repositorios
 */
export class SetQueryRepositorios implements Action
{
    readonly type = SET_QUERY_REPOSITORIOS;

    constructor(public payload: any)
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

export type RepositoriosActionsAll
    = GetRepositorios
    | GetRepositoriosSuccess
    | GetRepositoriosFailed
    | SetQueryRepositorios
    | UnloadRepositorios;
