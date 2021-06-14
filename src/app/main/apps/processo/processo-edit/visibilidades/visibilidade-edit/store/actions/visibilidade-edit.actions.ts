import {Action} from '@ngrx/store';

export const CREATE_VISIBILIDADE = '[VISIBILIDADE] CREATE VISIBILIDADE';
export const CREATE_VISIBILIDADE_SUCCESS = '[VISIBILIDADE] CREATE VISIBILIDADE SUCCESS';

export const SAVE_VISIBILIDADE = '[VISIBILIDADE] SAVE VISIBILIDADE';
export const SAVE_VISIBILIDADE_SUCCESS = '[VISIBILIDADE] SAVE VISIBILIDADE SUCCESS';
export const SAVE_VISIBILIDADE_FAILED = '[VISIBILIDADE] SAVE VISIBILIDADE FAILED';

export const GET_VISIBILIDADE = '[VISIBILIDADE] GET VISIBILIDADE';
export const GET_VISIBILIDADE_SUCCESS = '[VISIBILIDADE] GET VISIBILIDADE SUCCESS';
export const GET_VISIBILIDADE_FAILED = '[VISIBILIDADE] GET VISIBILIDADE FAILED';

export const UNLOAD_STORE = '[VISIBILIDADE-EDIT] UNLOAD STORE';

/**
 * Get Visibilidade
 */
export class GetVisibilidade implements Action
{
    readonly type = GET_VISIBILIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Success
 */
export class GetVisibilidadeSuccess implements Action
{
    readonly type = GET_VISIBILIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Failed
 */
export class GetVisibilidadeFailed implements Action
{
    readonly type = GET_VISIBILIDADE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Visibilidade
 */
export class SaveVisibilidade implements Action
{
    readonly type = SAVE_VISIBILIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Visibilidade Success
 */
export class SaveVisibilidadeSuccess implements Action
{
    readonly type = SAVE_VISIBILIDADE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Visibilidade Failed
 */
export class SaveVisibilidadeFailed implements Action
{
    readonly type = SAVE_VISIBILIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Visibilidade
 */
export class CreateVisibilidade implements Action
{
    readonly type = CREATE_VISIBILIDADE;

    constructor()
    {
    }
}

/**
 * Create Visibilidade Success
 */
export class CreateVisibilidadeSuccess implements Action
{
    readonly type = CREATE_VISIBILIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type VisibilidadeEditActionsAll
    = CreateVisibilidade
    | CreateVisibilidadeSuccess
    | GetVisibilidade
    | GetVisibilidadeSuccess
    | GetVisibilidadeFailed
    | SaveVisibilidade
    | SaveVisibilidadeSuccess
    | SaveVisibilidadeFailed
    | UnloadStore;
