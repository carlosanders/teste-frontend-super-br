import {Action} from '@ngrx/store';

export const GET_SIGILOS_DOCUMENTO = '[DOCUMENTO EDIT SIGILO] GET SIGILOS';
export const GET_SIGILOS_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT SIGILO] GET SIGILOS SUCCESS';
export const GET_SIGILOS_DOCUMENTO_FAILED = '[DOCUMENTO EDIT SIGILO] GET SIGILOS FAILED';

export const RELOAD_SIGILOS_DOCUMENTO = '[DOCUMENTO EDIT SIGILO] RELOAD SIGILOS';

export const UNLAOD_SIGILOS = '[DOCUMENTO EDIT SIGILO] UNLOAD SIGILO';

export const DELETE_SIGILO_DOCUMENTO = '[DOCUMENTO EDIT SIGILO] DELETE SIGILO';
export const DELETE_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT SIGILO] DELETE SIGILO SUCCESS';
export const DELETE_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO EDIT SIGILO] DELETE SIGILO FAILED';

export const GET_SIGILO_DOCUMENTO = '[DOCUMENTO EDIT SIGILO] GET SIGILO';
export const GET_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT SIGILO] GET SIGILO SUCCESS';
export const GET_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO EDIT SIGILO] GET SIGILO FAILED';

export const SAVE_SIGILO_DOCUMENTO = '[DOCUMENTO EDIT SIGILO] SAVE DOCUMENTO SIGILO';
export const SAVE_SIGILO_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT SIGILO] SAVE SIGILO DOCUMENTO SUCCESS';
export const SAVE_SIGILO_DOCUMENTO_FAILED = '[DOCUMENTO EDIT SIGILO] SAVE SIGILO DOCUMENTO FAILED';

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

export class UnloadSigilos implements Action {

    readonly  type = UNLAOD_SIGILOS;

    constructor() {
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
    | UnloadSigilos
    | DeleteSigilo
    | DeleteSigiloSuccess
    | DeleteSigiloFailed
    | SaveSigiloDocumento
    | SaveSigiloDocumentoSuccess
    | SaveSigiloDocumentoFailed;

