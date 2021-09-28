import {Action} from '@ngrx/store';

export const GET_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL LIST] GET CONTA EMAIL';
export const GET_CONTA_EMAIL_SUCCESS = '[COORDENADOR CONTA EMAIL LIST] GET CONTA EMAIL SUCCESS';
export const GET_CONTA_EMAIL_FAILED = '[COORDENADOR CONTA EMAIL LIST] GET CONTA EMAIL FAILED';

export const RELOAD_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL LIST] RELOAD CONTA EMAIL';
export const UNLOAD_CONTA_EMAIL = '[COORDENADOR CONTA EMAIL LIST] UNLOAD CONTA EMAIL';


/**
 * Get ContaEmail
 */
export class GetContaEmail implements Action {
    readonly type = GET_CONTA_EMAIL;

    constructor(public payload: any) {
    }
}

/**
 * Get ContaEmail Success
 */
export class GetContaEmailSuccess implements Action {
    readonly type = GET_CONTA_EMAIL_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get ContaEmail Failed
 */
export class GetContaEmailFailed implements Action {
    readonly type = GET_CONTA_EMAIL_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload ContaEmail
 */
 export class UnloadContaEmail implements Action {
    readonly type = UNLOAD_CONTA_EMAIL;

    constructor() {
    }
}

/**
 * Reload ContaEmail
 */
export class ReloadContaEmail implements Action {
    readonly type = RELOAD_CONTA_EMAIL;

    constructor() {
    }
}


export type ContaEmailListActionsAll
    = GetContaEmail
    | GetContaEmailSuccess
    | GetContaEmailFailed
    | UnloadContaEmail
    | ReloadContaEmail;

