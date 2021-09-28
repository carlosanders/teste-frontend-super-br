import {Action} from '@ngrx/store';

export const CREATE_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL EDIT] CREATE CONTA EMAIL';
export const CREATE_CONTA_EMAIL_SUCCESS = '[COORDENADOR CONTA EMAIL EDIT] CREATE CONTA EMAIL SUCCESS';

export const SAVE_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL EDIT] SAVE CONTA EMAIL';
export const SAVE_CONTA_EMAIL_SUCCESS = '[COORDENADOR CONTA EMAIL EDIT] SAVE CONTA EMAIL SUCCESS';
export const SAVE_CONTA_EMAIL_FAILED = '[COORDENADOR CONTA EMAIL EDIT] SAVE CONTA EMAIL FAILED';

export const UPDATE_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL EDIT] UPDATE CONTA EMAIL';
export const UPDATE_CONTA_EMAIL_SUCCESS = '[COORDENADOR CONTA EMAIL EDIT] UPDATE CONTA EMAIL SUCCESS';
export const UPDATE_CONTA_EMAIL_FAILED = '[COORDENADOR CONTA EMAIL EDIT] UPDATE CONTA EMAIL FAILED';

export const GET_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL EDIT] GET CONTA EMAIL';
export const GET_CONTA_EMAIL_SUCCESS = '[COORDENADOR CONTA EMAIL EDIT] GET CONTA EMAIL SUCCESS';
export const GET_CONTA_EMAIL_FAILED = '[COORDENADOR CONTA EMAIL EDIT] GET CONTA EMAIL FAILED';

/**
 * Get ContaEmail
 */
export class GetContaEmail implements Action
{
    readonly type = GET_CONTA_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ContaEmail Success
 */
export class GetContaEmailSuccess implements Action
{
    readonly type = GET_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ContaEmail Failed
 */
export class GetContaEmailFailed implements Action
{
    readonly type = GET_CONTA_EMAIL_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ContaEmail
 */
export class SaveContaEmail implements Action
{
    readonly type = SAVE_CONTA_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ContaEmail
 */
export class UpdateContaEmail implements Action
{
    readonly type = UPDATE_CONTA_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ContaEmail Success
 */
export class SaveContaEmailSuccess implements Action
{
    readonly type = SAVE_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ContaEmail Failed
 */
export class SaveContaEmailFailed implements Action
{
    readonly type = SAVE_CONTA_EMAIL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ContaEmail Success
 */
export class UpdateContaEmailSuccess implements Action
{
    readonly type = UPDATE_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ContaEmail Failed
 */
export class UpdateContaEmailFailed implements Action
{
    readonly type = UPDATE_CONTA_EMAIL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create ContaEmail
 */
export class CreateContaEmail implements Action
{
    readonly type = CREATE_CONTA_EMAIL;

    constructor()
    {
    }
}

/**
 * Create ContaEmail Success
 */
export class CreateContaEmailSuccess implements Action
{
    readonly type = CREATE_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}



export type ContaEmailEditActionsAll
    = CreateContaEmail
    | CreateContaEmailSuccess
    | GetContaEmail
    | GetContaEmailSuccess
    | GetContaEmailFailed
    | SaveContaEmail
    | SaveContaEmailSuccess
    | SaveContaEmailFailed
    | UpdateContaEmail
    | UpdateContaEmailSuccess
    | UpdateContaEmailFailed;
