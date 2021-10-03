import {Action} from '@ngrx/store';

export const GET_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL LIST] GET SERVIDOR EMAIL';
export const GET_SERVIDOR_EMAIL_SUCCESS = '[ADMIN SERVIDOR EMAIL LIST] GET SERVIDOR EMAIL SUCCESS';
export const GET_SERVIDOR_EMAIL_FAILED = '[ADMIN SERVIDOR EMAIL LIST] GET SERVIDOR EMAIL FAILED';

export const RELOAD_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL LIST] RELOAD SERVIDOR EMAIL';
export const UNLOAD_SERVIDOR_EMAIL = '[ADMIN SERVIDOR EMAIL LIST] UNLOAD SERVIDOR EMAIL';


/**
 * Get ServidorEmail
 */
export class GetServidorEmail implements Action {
    readonly type = GET_SERVIDOR_EMAIL;

    constructor(public payload: any) {
    }
}

/**
 * Get ServidorEmail Success
 */
export class GetServidorEmailSuccess implements Action {
    readonly type = GET_SERVIDOR_EMAIL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get ServidorEmail Failed
 */
export class GetServidorEmailFailed implements Action {
    readonly type = GET_SERVIDOR_EMAIL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload ServidorEmail
 */
 export class UnloadServidorEmail implements Action {
    readonly type = UNLOAD_SERVIDOR_EMAIL;

    constructor() {
    }
}

/**
 * Reload ServidorEmail
 */
export class ReloadServidorEmail implements Action {
    readonly type = RELOAD_SERVIDOR_EMAIL;

    constructor() {
    }
}


export type ServidorEmailListActionsAll
    = GetServidorEmail
    | GetServidorEmailSuccess
    | GetServidorEmailFailed
    | UnloadServidorEmail
    | ReloadServidorEmail;

