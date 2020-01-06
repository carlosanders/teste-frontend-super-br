import { Action } from '@ngrx/store';

export const GET_SIGILOS_DOCUMENTO = '[DOCUMENTO SIGILO] GET SIGILOS';
export const GET_SIGILOS_DOCUMENTO_SUCCESS = '[DOCUMENTO SIGILO] GET SIGILOS SUCCESS';
export const GET_SIGILOS_DOCUMENTO_FAILED = '[DOCUMENTO SIGILO] GET SIGILOS FAILED';

export const RELOAD_SIGILOS_DOCUMENTO = '[DOCUMENTO SIGILO] RELOAD SIGILOS';

export const DELETE_SIGILO_DOCUMENTO = '[DOCUMENTO SIGILO] DELETE SIGILO';
export const DELETE_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO SIGILO] DELETE SIGILO SUCCESS';
export const DELETE_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO SIGILO] DELETE SIGILO FAILED';

export const GET_SIGILO_DOCUMENTO = '[DOCUMENTO SIGILO] GET SIGILO';
export const GET_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO SIGILO] GET SIGILO SUCCESS';
export const GET_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO SIGILO] GET SIGILO FAILED';

export const SAVE_SIGILO_DOCUMENTO = '[DOCUMENTO SIGILO] SAVE DOCUMENTO SIGILO';
export const SAVE_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO SIGILO] SAVE SIGILO DOCUMENTO SUCCESS';
export const SAVE_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO SIGILO] SAVE SIGILO DOCUMENTO FAILED';

/**
 * Get Sigilos
 */
export class GetSigilos implements Action
{
    readonly type = GET_SIGILOS_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilos Success
 */
export class GetSigilosSuccess implements Action
{
    readonly type = GET_SIGILOS_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilos Failed
 */
export class GetSigilosFailed implements Action
{
    readonly type = GET_SIGILOS_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Sigilos
 */
export class ReloadSigilos implements Action
{
    readonly type = RELOAD_SIGILOS_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Delete Sigilo
 */
export class DeleteSigilo implements Action
{
    readonly type = DELETE_SIGILO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Sigilo Success
 */
export class DeleteSigiloSuccess implements Action
{
    readonly type = DELETE_SIGILO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Sigilo Failed
 */
export class DeleteSigiloFailed implements Action
{
    readonly type = DELETE_SIGILO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Sigilo
 */
export class GetSigilo implements Action
{
    readonly type = GET_SIGILO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilo Success
 */
export class GetSigiloSuccess implements Action
{
    readonly type = GET_SIGILO_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Sigilo Failed
 */
export class GetSigiloFailed implements Action
{
    readonly type = GET_SIGILO_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Save SigiloDocumento
 */
export class SaveSigiloDocumento implements Action
{
    readonly type = SAVE_SIGILO_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Sigilo Success
 */
export class SaveSigiloDocumentoSuccess implements Action
{
    readonly type = SAVE_SIGILO_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Sigilo Failed
 */
export class SaveSigiloDocumentoFailed implements Action
{
    readonly type = SAVE_SIGILO_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type SigiloActionsAll
    = GetSigilos
    | GetSigilosSuccess
    | GetSigilosFailed
    | GetSigilo
    | GetSigiloSuccess
    | GetSigiloFailed
    | ReloadSigilos
    | DeleteSigilo
    | DeleteSigiloSuccess
    | DeleteSigiloFailed
    | SaveSigiloDocumento
    | SaveSigiloDocumentoSuccess
    | SaveSigiloDocumentoFailed;

