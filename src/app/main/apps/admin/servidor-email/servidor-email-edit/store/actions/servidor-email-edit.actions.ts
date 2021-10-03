import {Action} from '@ngrx/store';

export const CREATE_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL EDIT] CREATE SERVIDOR EMAIL';
export const CREATE_SERVIDOR_EMAIL_SUCCESS = '[ADMIN SERVIDOR EMAIL EDIT] CREATE SERVIDOR EMAIL SUCCESS';

export const SAVE_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL EDIT] SAVE SERVIDOR EMAIL';
export const SAVE_SERVIDOR_EMAIL_SUCCESS = '[ADMIN SERVIDOR EMAIL EDIT] SAVE SERVIDOR EMAIL SUCCESS';
export const SAVE_SERVIDOR_EMAIL_FAILED = '[ADMIN SERVIDOR EMAIL EDIT] SAVE SERVIDOR EMAIL FAILED';

export const UPDATE_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL EDIT] UPDATE SERVIDOR EMAIL';
export const UPDATE_SERVIDOR_EMAIL_SUCCESS = '[ADMIN SERVIDOR EMAIL EDIT] UPDATE SERVIDOR EMAIL SUCCESS';
export const UPDATE_SERVIDOR_EMAIL_FAILED = '[ADMIN SERVIDOR EMAIL EDIT] UPDATE SERVIDOR EMAIL FAILED';

export const GET_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL EDIT] GET SERVIDOR EMAIL';
export const GET_SERVIDOR_EMAIL_SUCCESS = '[ADMIN SERVIDOR EMAIL EDIT] GET SERVIDOR EMAIL SUCCESS';
export const GET_SERVIDOR_EMAIL_FAILED = '[ADMIN SERVIDOR EMAIL EDIT] GET SERVIDOR EMAIL FAILED';

/**
 * Get ServidorEmail
 */
export class GetServidorEmail implements Action
{
    readonly type = GET_SERVIDOR_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ServidorEmail Success
 */
export class GetServidorEmailSuccess implements Action
{
    readonly type = GET_SERVIDOR_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get ServidorEmail Failed
 */
export class GetServidorEmailFailed implements Action
{
    readonly type = GET_SERVIDOR_EMAIL_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save ServidorEmail
 */
export class SaveServidorEmail implements Action
{
    readonly type = SAVE_SERVIDOR_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ServidorEmail
 */
export class UpdateServidorEmail implements Action
{
    readonly type = UPDATE_SERVIDOR_EMAIL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ServidorEmail Success
 */
export class SaveServidorEmailSuccess implements Action
{
    readonly type = SAVE_SERVIDOR_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save ServidorEmail Failed
 */
export class SaveServidorEmailFailed implements Action
{
    readonly type = SAVE_SERVIDOR_EMAIL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ServidorEmail Success
 */
export class UpdateServidorEmailSuccess implements Action
{
    readonly type = UPDATE_SERVIDOR_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update ServidorEmail Failed
 */
export class UpdateServidorEmailFailed implements Action
{
    readonly type = UPDATE_SERVIDOR_EMAIL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create ServidorEmail
 */
export class CreateServidorEmail implements Action
{
    readonly type = CREATE_SERVIDOR_EMAIL;

    constructor()
    {
    }
}

/**
 * Create ServidorEmail Success
 */
export class CreateServidorEmailSuccess implements Action
{
    readonly type = CREATE_SERVIDOR_EMAIL_SUCCESS;

    constructor(public payload: any)
    {
    }
}



export type ServidorEmailEditActionsAll
    = CreateServidorEmail
    | CreateServidorEmailSuccess
    | GetServidorEmail
    | GetServidorEmailSuccess
    | GetServidorEmailFailed
    | SaveServidorEmail
    | SaveServidorEmailSuccess
    | SaveServidorEmailFailed
    | UpdateServidorEmail
    | UpdateServidorEmailSuccess
    | UpdateServidorEmailFailed;
