import {Action} from '@ngrx/store';

export const GET_SIGILOS = '[SIGILO LIST] GET SIGILOS';
export const GET_SIGILOS_SUCCESS = '[SIGILO LIST] GET SIGILOS SUCCESS';
export const GET_SIGILOS_FAILED = '[SIGILO LIST] GET SIGILOS FAILED';

export const RELOAD_SIGILOS = '[SIGILO LIST] RELOAD SIGILOS';

export const DELETE_SIGILO = '[SIGILO LIST] DELETE SIGILO';
export const DELETE_SIGILO_SUCCESS = '[SIGILO LIST] DELETE SIGILO SUCCESS';
export const DELETE_SIGILO_FAILED = '[SIGILO LIST] DELETE SIGILO FAILED';

/**
 * Get Sigilos
 */
export class GetSigilos implements Action
{
    readonly type = GET_SIGILOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilos Success
 */
export class GetSigilosSuccess implements Action
{
    readonly type = GET_SIGILOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilos Failed
 */
export class GetSigilosFailed implements Action
{
    readonly type = GET_SIGILOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Sigilos
 */
export class ReloadSigilos implements Action
{
    readonly type = RELOAD_SIGILOS;

    constructor()
    {
    }
}

/**
 * Delete Sigilo
 */
export class DeleteSigilo implements Action
{
    readonly type = DELETE_SIGILO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Sigilo Success
 */
export class DeleteSigiloSuccess implements Action
{
    readonly type = DELETE_SIGILO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Sigilo Failed
 */
export class DeleteSigiloFailed implements Action
{
    readonly type = DELETE_SIGILO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type SigiloListActionsAll
    = GetSigilos
    | GetSigilosSuccess
    | GetSigilosFailed
    | ReloadSigilos
    | DeleteSigilo
    | DeleteSigiloSuccess
    | DeleteSigiloFailed;

