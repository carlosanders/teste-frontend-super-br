import {Action} from '@ngrx/store';

export const CREATE_INTERESSADO = '[INTERESSADO] CREATE INTERESSADO';
export const CREATE_INTERESSADO_SUCCESS = '[INTERESSADO] CREATE INTERESSADO SUCCESS';

export const SAVE_INTERESSADO = '[INTERESSADO] SAVE INTERESSADO';
export const SAVE_INTERESSADO_SUCCESS = '[INTERESSADO] SAVE INTERESSADO SUCCESS';
export const SAVE_INTERESSADO_FAILED = '[INTERESSADO] SAVE INTERESSADO FAILED';

export const GET_INTERESSADO = '[INTERESSADO] GET INTERESSADO';
export const GET_INTERESSADO_SUCCESS = '[INTERESSADO] GET INTERESSADO SUCCESS';
export const GET_INTERESSADO_FAILED = '[INTERESSADO] GET INTERESSADO FAILED';

export const UNLOAD_STORE = '[INTERESSADO-EDIT] UNLOAD STORE';

/**
 * Get Interessado
 */
export class GetInteressado implements Action
{
    readonly type = GET_INTERESSADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessado Success
 */
export class GetInteressadoSuccess implements Action
{
    readonly type = GET_INTERESSADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessado Failed
 */
export class GetInteressadoFailed implements Action
{
    readonly type = GET_INTERESSADO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Interessado
 */
export class SaveInteressado implements Action
{
    readonly type = SAVE_INTERESSADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Interessado Success
 */
export class SaveInteressadoSuccess implements Action
{
    readonly type = SAVE_INTERESSADO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Interessado Failed
 */
export class SaveInteressadoFailed implements Action
{
    readonly type = SAVE_INTERESSADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Interessado
 */
export class CreateInteressado implements Action
{
    readonly type = CREATE_INTERESSADO;

    constructor()
    {
    }
}

/**
 * Create Interessado Success
 */
export class CreateInteressadoSuccess implements Action
{
    readonly type = CREATE_INTERESSADO_SUCCESS;

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

export type InteressadoEditActionsAll
    = CreateInteressado
    | CreateInteressadoSuccess
    | GetInteressado
    | GetInteressadoSuccess
    | GetInteressadoFailed
    | SaveInteressado
    | SaveInteressadoSuccess
    | SaveInteressadoFailed
    | UnloadStore;
