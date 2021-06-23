import {Action} from '@ngrx/store';

export const CREATE_SIGILO = '[SIGILO] CREATE SIGILO';
export const CREATE_SIGILO_SUCCESS = '[SIGILO] CREATE SIGILO SUCCESS';

export const SAVE_SIGILO = '[SIGILO] SAVE SIGILO';
export const SAVE_SIGILO_SUCCESS = '[SIGILO] SAVE SIGILO SUCCESS';
export const SAVE_SIGILO_FAILED = '[SIGILO] SAVE SIGILO FAILED';

export const GET_SIGILO = '[SIGILO] GET SIGILO';
export const GET_SIGILO_SUCCESS = '[SIGILO] GET SIGILO SUCCESS';
export const GET_SIGILO_FAILED = '[SIGILO] GET SIGILO FAILED';

export const UNLOAD_STORE = '[SIGILO-EDIT] UNLOAD STORE';

/**
 * Get Sigilo
 */
export class GetSigilo implements Action
{
    readonly type = GET_SIGILO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilo Success
 */
export class GetSigiloSuccess implements Action
{
    readonly type = GET_SIGILO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilo Failed
 */
export class GetSigiloFailed implements Action
{
    readonly type = GET_SIGILO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Sigilo
 */
export class SaveSigilo implements Action
{
    readonly type = SAVE_SIGILO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Sigilo Success
 */
export class SaveSigiloSuccess implements Action
{
    readonly type = SAVE_SIGILO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Sigilo Failed
 */
export class SaveSigiloFailed implements Action
{
    readonly type = SAVE_SIGILO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Sigilo
 */
export class CreateSigilo implements Action
{
    readonly type = CREATE_SIGILO;

    constructor()
    {
    }
}

/**
 * Create Sigilo Success
 */
export class CreateSigiloSuccess implements Action
{
    readonly type = CREATE_SIGILO_SUCCESS;

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

export type SigiloEditActionsAll
    = CreateSigilo
    | CreateSigiloSuccess
    | GetSigilo
    | GetSigiloSuccess
    | GetSigiloFailed
    | SaveSigilo
    | SaveSigiloSuccess
    | SaveSigiloFailed
    | UnloadStore;
