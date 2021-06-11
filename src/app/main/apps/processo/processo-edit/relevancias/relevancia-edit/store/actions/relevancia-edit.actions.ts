import {Action} from '@ngrx/store';

export const CREATE_RELEVANCIA = '[RELEVANCIA] CREATE RELEVANCIA';
export const CREATE_RELEVANCIA_SUCCESS = '[RELEVANCIA] CREATE RELEVANCIA SUCCESS';

export const SAVE_RELEVANCIA = '[RELEVANCIA] SAVE RELEVANCIA';
export const SAVE_RELEVANCIA_SUCCESS = '[RELEVANCIA] SAVE RELEVANCIA SUCCESS';
export const SAVE_RELEVANCIA_FAILED = '[RELEVANCIA] SAVE RELEVANCIA FAILED';

export const GET_RELEVANCIA = '[RELEVANCIA] GET RELEVANCIA';
export const GET_RELEVANCIA_SUCCESS = '[RELEVANCIA] GET RELEVANCIA SUCCESS';
export const GET_RELEVANCIA_FAILED = '[RELEVANCIA] GET RELEVANCIA FAILED';

export const UNLOAD_STORE = '[RELEVANCIA-EDIT] UNLOAD STORE';

/**
 * Get Relevancia
 */
export class GetRelevancia implements Action
{
    readonly type = GET_RELEVANCIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relevancia Success
 */
export class GetRelevanciaSuccess implements Action
{
    readonly type = GET_RELEVANCIA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relevancia Failed
 */
export class GetRelevanciaFailed implements Action
{
    readonly type = GET_RELEVANCIA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Relevancia
 */
export class SaveRelevancia implements Action
{
    readonly type = SAVE_RELEVANCIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Relevancia Success
 */
export class SaveRelevanciaSuccess implements Action
{
    readonly type = SAVE_RELEVANCIA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Relevancia Failed
 */
export class SaveRelevanciaFailed implements Action
{
    readonly type = SAVE_RELEVANCIA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Relevancia
 */
export class CreateRelevancia implements Action
{
    readonly type = CREATE_RELEVANCIA;

    constructor()
    {
    }
}

/**
 * Create Relevancia Success
 */
export class CreateRelevanciaSuccess implements Action
{
    readonly type = CREATE_RELEVANCIA_SUCCESS;

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

export type RelevanciaEditActionsAll
    = CreateRelevancia
    | CreateRelevanciaSuccess
    | GetRelevancia
    | GetRelevanciaSuccess
    | GetRelevanciaFailed
    | SaveRelevancia
    | SaveRelevanciaSuccess
    | SaveRelevanciaFailed
    | UnloadStore;
