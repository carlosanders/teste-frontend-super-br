import {Action} from '@ngrx/store';

export const CREATE_REPOSITORIO = '[REPOSITORIO] CREATE REPOSITORIO';
export const CREATE_REPOSITORIO_SUCCESS = '[REPOSITORIO] CREATE REPOSITORIO SUCCESS';

export const SAVE_REPOSITORIO = '[REPOSITORIO] SAVE REPOSITORIO';
export const SAVE_REPOSITORIO_SUCCESS = '[REPOSITORIO] SAVE REPOSITORIO SUCCESS';
export const SAVE_REPOSITORIO_FAILED = '[REPOSITORIO] SAVE REPOSITORIO FAILED';

export const GET_REPOSITORIO = '[REPOSITORIO] GET REPOSITORIO';
export const GET_REPOSITORIO_SUCCESS = '[REPOSITORIO] GET REPOSITORIO SUCCESS';
export const GET_REPOSITORIO_FAILED = '[REPOSITORIO] GET REPOSITORIO FAILED';

/**
 * Get Repositorio
 */
export class GetRepositorio implements Action
{
    readonly type = GET_REPOSITORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorio Success
 */
export class GetRepositorioSuccess implements Action
{
    readonly type = GET_REPOSITORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Repositorio Failed
 */
export class GetRepositorioFailed implements Action
{
    readonly type = GET_REPOSITORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Repositorio
 */
export class SaveRepositorio implements Action
{
    readonly type = SAVE_REPOSITORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Repositorio Success
 */
export class SaveRepositorioSuccess implements Action
{
    readonly type = SAVE_REPOSITORIO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Repositorio Failed
 */
export class SaveRepositorioFailed implements Action
{
    readonly type = SAVE_REPOSITORIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Repositorio
 */
export class CreateRepositorio implements Action
{
    readonly type = CREATE_REPOSITORIO;

    constructor()
    {
    }
}

/**
 * Create Repositorio Success
 */
export class CreateRepositorioSuccess implements Action
{
    readonly type = CREATE_REPOSITORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type RepositorioEditActionsAll
    = CreateRepositorio
    | CreateRepositorioSuccess
    | GetRepositorio
    | GetRepositorioSuccess
    | GetRepositorioFailed
    | SaveRepositorio
    | SaveRepositorioSuccess
    | SaveRepositorioFailed;
